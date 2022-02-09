import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/authSlice';
import { closeModal, openModal } from '../../redux/modalSlice';

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { LOGIN_USER, REGISTER_USER } from '../../graphql/mutations/user';

import { handleValidateInput } from '../../utils/formValidator';

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
    taskBody: '',
    taskFinishDate: '',
    taskPriority: '',
    uncategorizedErrors: '',
  };
  const [formData, setFormData] = useState(initFormDataState);
  const [formErrors, setFormErrors] = useState(initFormDataState);
  const [formKind, setFormKind] = useState(null);
  const [formSentSuccessfully, setFormSentSuccessfully] = useState(false);
  const [formWarnings, setFormWarnings] = useState(initFormDataState);

  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const user = useSelector((state) => state.auth.user);

  const checkWarningData = useRef(null);
  const elementToSetFocus = useRef(null);
  const lastActiveElement = useRef(null);
  const modalElementToSetFocus = useRef(null);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [loginUser, { data: dataLoginUser, loading: loadingLoginUser, reset: resetLoginUser }] =
    useMutation(LOGIN_USER, {
      update() {
        handleFormSent();
        resetLoginUser();
      },
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
          handleSetErrors([err.graphQLErrors[0].extensions.errors]);
        }
        resetLoginUser();
      },
    });

  const [registerUser, { loading: loadingRegisterUser, reset: resetRegisterUser }] = useMutation(
    REGISTER_USER,
    {
      update() {
        handleFormSent();
        resetRegisterUser();
      },
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
          handleSetErrors([err.graphQLErrors[0].extensions.errors]);
        }
        resetRegisterUser();
      },
    }
  );

  useEffect(() => {
    if (dataLoginUser) {
      dispatch(setUser(dataLoginUser.login));
    }
  }, [dataLoginUser, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (isModalOpenOnInit) {
      dispatch(openModal());
    }
  }, [dispatch, isModalOpenOnInit]);

  useEffect(() => {
    if (!lastActiveElement.current) {
      lastActiveElement.current = document.activeElement;
    }

    if (isModalOpen) {
      setTimeout(() => {
        if (modalElementToSetFocus.current) {
          modalElementToSetFocus.current.focus();
          if (modalElementToSetFocus.current.type === 'radio') {
            modalElementToSetFocus.current.checked = true;
          }
        }
      }, 100);
    } else if (elementToSetFocus.current) {
      elementToSetFocus.current.focus();
    } else if (lastActiveElement.current) {
      setTimeout(() => {
        lastActiveElement.current.focus();
      }, 100);
    }
  }, [isLogoutTimeoutModalOpen, isModalOpen]);

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (formSentSuccessfully) {
      setFormSentSuccessfully(false);
    }
    handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
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
    e.preventDefault();
    handleClearFormState([setFormErrors]);
    const { errors } = handleValidateInput(formData);
    handleSetErrors(errors);
    if (errors.length === 0) {
      if (formKind === 'loginForm') {
        loginUser({ variables: { login: formData.login, password: formData.password } });
      }
      if (formKind === 'registerForm') {
        registerUser({
          variables: {
            input: {
              avatar: formData.avatar,
              login: formData.login,
              name: formData.name,
              password: formData.password,
              passwordRepeated: formData.passwordRepeated,
            },
          },
        });
      }
    }
    handleScrollModal();
  };

  const handleFormSent = () => {
    let shouldCloseModal = handleCloseModalOnSubmitForm();
    setFormSentSuccessfully(true);
    handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
    checkWarningData.current = initFormDataState;
    if (shouldCloseModal) {
      handleCloseModal();
    } else {
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
          <>
            <FormParagraph error={true}>
              W formularzu wykryto poniższe błędy, popraw je i spróbuj ponownie!
            </FormParagraph>
            {formErrors.uncategorizedErrors && (
              <FormParagraph error={true}>{formErrors.uncategorizedErrors}</FormParagraph>
            )}
          </>
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
    if (modalElementToSetFocus.current) {
      modalElementToSetFocus.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loginForm && (
        <>
          <LoginForm
            formErrors={formErrors}
            formWarnings={formWarnings}
            isModalOpen={isModalOpen}
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
            loading={loadingLoginUser}
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
              formSentSuccessfully={formSentSuccessfully}
              formWarnings={formWarnings}
              loading={loadingRegisterUser}
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
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
            setFormKind={setFormKind}
          />
        </Modal>
      )}
      {passwordForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <PasswordForm
            formErrors={formErrors}
            formSentSuccessfully={formSentSuccessfully}
            formWarnings={formWarnings}
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
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
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
            taskBodyValue={formData.taskBody}
            taskFinishDateValue={formData.taskFinishDate}
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
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
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
