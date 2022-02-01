import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { closeModal, openModal } from '../../redux/modalSlice';

import { handleValidateInput } from '../../utils/formValidator';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock';

import { FormParagraph } from './styles/StyledForm';

import AvatarsForm from './subcomponents/AvatarsForm';
import ClearTasksListForm from './subcomponents/ClearTasksListForm';
import LoginForm from './subcomponents/LoginForm';
import Modal from '../Modal/Modal';
import PasswordForm from './subcomponents/PasswordForm';
import RegisterForm from './subcomponents/RegisterForm';
import TaskForm from './subcomponents/TaskForm';

const Form = ({
  avatarsForm,
  clearTasksListForm,
  disableForm,
  isModalOpenOnInit,
  loginForm,
  passwordForm,
  taskForm,
}) => {
  const initFormDataState = {
    avatar: '',
    login: '',
    name: '',
    newPassword: '',
    oldPassword: '',
    password: '',
    passwordRepeated: '',
    taskName: '',
    taskDate: '',
    taskPriority: '',
  };
  const [formData, setFormData] = useState(initFormDataState);
  const [formErrors, setFormErrors] = useState(initFormDataState);
  const [formKind, setFormKind] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [formWarnings, setFormWarnings] = useState(initFormDataState);
  const [windowScrollY, setWindowScrollY] = useState(0);

  const checkWarningData = useRef(null);
  const elementToSetFocus = useRef(null);
  const lastActiveElement = useRef(null);
  const modalElementToSetFocus = useRef(null);

  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  useEffect(() => {
    setWindowScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    if (isModalOpenOnInit) {
      lockBodyScroll(windowScrollY);
      setTimeout(() => {
        dispatch(openModal());
      }, 1);
    }
  }, [dispatch, isModalOpenOnInit, windowScrollY]);

  useEffect(() => {
    if (isModalOpen) {
      lastActiveElement.current = document.activeElement;
      setTimeout(() => {
        modalElementToSetFocus.current.focus();
        if (modalElementToSetFocus.current.type === 'radio') {
          modalElementToSetFocus.current.checked = true;
        }
      }, 100);
    } else if (elementToSetFocus.current) {
      elementToSetFocus.current.focus();
    } else if (lastActiveElement.current) {
      lastActiveElement.current.focus();
    }
  }, [isModalOpen]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (formSent) {
      setFormSent(false);
    }
    lockBodyScroll(windowScrollY);
    dispatch(openModal());
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    dispatch(closeModal());
    if (disableForm) {
      disableForm();
    }
    unlockBodyScroll(windowScrollY);
    handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
    checkWarningData.current = initFormDataState;
  };

  const handleUserInput = (e) => {
    const name = e.target.name;
    if (e.target.type === 'radio') {
      const id = e.target.id;
      setFormData({ ...formData, [name]: id });
    } else {
      const value = e.target.value;
      setFormData({ ...formData, [name]: value });
      checkWarningData.current = { ...formData, [name]: value };
    }
    handleClearFormState([setFormWarnings]);
    const { warnings } = handleValidateInput(checkWarningData.current);
    handleSetWarnings(warnings);
  };

  const handleSubmitForm = (e) => {
    let shouldCloseModal = handleCloseModalOnSubmitForm();

    e.preventDefault();
    handleClearFormState([setFormErrors]);
    const { errors } = handleValidateInput(formData);
    handleSetErrors(errors);

    if (errors.length === 0) {
      console.log('form sent');
      setFormSent(true);
      handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
      checkWarningData.current = initFormDataState;
      if (shouldCloseModal) {
        handleCloseModal();
      }
    }
    if (!shouldCloseModal) {
      handleScrollModal();
    }
  };

  const handleSetErrors = (errors) => {
    errors.forEach((error) => {
      const inputName = Object.keys(error);
      const inputError = Object.values(error);
      setFormErrors((prevState) => ({
        ...prevState,
        [inputName]: inputError,
      }));
    });
  };

  const handleSetWarnings = (warnings) => {
    warnings.forEach((warning) => {
      const inputName = Object.keys(warning);
      const inputWarning = Object.values(warning);
      setFormWarnings((prevState) => ({
        ...prevState,
        [inputName]: inputWarning,
      }));
    });
  };

  const handleErrorInformation = () => {
    for (const error in formErrors) {
      if (formErrors[error].length > 0) {
        return (
          <FormParagraph error={true}>
            W formularzu wykryto poniższe błędy, popraw je i spróbuj ponownie!
          </FormParagraph>
        );
      }
    }
  };

  const handleClearFormState = (callbacks) => {
    callbacks.forEach((callback) => callback(initFormDataState));
  };

  const handleCloseModalOnSubmitForm = () => {
    if (formKind === 'passwordForm' || formKind === 'registerForm') {
      return false;
    } else {
      return true;
    }
  };

  const handleScrollModal = () => {
    modalElementToSetFocus.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {loginForm && (
        <>
          <LoginForm
            formErrors={formErrors}
            formWarnings={formWarnings}
            isModalOpen={isModalOpen}
            loginValue={formData.login}
            passwordValue={formData.password}
            ref={elementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleOpenModal={handleOpenModal}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormKind={setFormKind}
          />
          <Modal handleCloseModal={handleCloseModal}>
            <RegisterForm
              avatarValue={formData.avatar}
              formErrors={formErrors}
              formSent={formSent}
              formWarnings={formWarnings}
              loginValue={formData.login}
              nameValue={formData.name}
              passwordValue={formData.password}
              passwordRepeatedValue={formData.passwordRepeated}
              ref={modalElementToSetFocus}
              handleErrorInformation={handleErrorInformation}
              handleSubmitForm={handleSubmitForm}
              handleUserInput={handleUserInput}
            />
          </Modal>
        </>
      )}
      {avatarsForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <AvatarsForm
            avatarValue={formData.avatar}
            formErrors={formErrors}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormKind={setFormKind}
          />
        </Modal>
      )}
      {passwordForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <PasswordForm
            formErrors={formErrors}
            formSent={formSent}
            formWarnings={formWarnings}
            newPasswordValue={formData.newPassword}
            newPasswordValueRepeated={formData.newPasswordRepeated}
            oldPasswordValue={formData.oldPassword}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormKind={setFormKind}
          />
        </Modal>
      )}
      {taskForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <TaskForm
            formErrors={formErrors}
            formWarnings={formWarnings}
            taskNameValue={formData.taskName}
            taskDateValue={formData.taskDate}
            taskPriorityValue={formData.taskPriority}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormKind={setFormKind}
          />
        </Modal>
      )}
      {clearTasksListForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <ClearTasksListForm
            handleCloseModal={handleCloseModal}
            ref={modalElementToSetFocus}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormKind={setFormKind}
          />
        </Modal>
      )}
    </>
  );
};

export default Form;
