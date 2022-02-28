import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setIsUserTokenExpired, setUser } from '../../redux/authSlice';
import { closeAccountMenu } from '../../redux/layoutSlice';
import { closeModal, openModal } from '../../redux/modalSlice';
import { clearCheckedTasks, resetTasksList } from '../../redux/tasksListSlice';

import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_TASK, DELETE_ALL_TASKS, EDIT_TASK } from '../../graphql/mutations/tasksList';
import {
  DELETE_USER,
  LOGIN_USER,
  REGISTER_USER,
  UPDATE_USER_AVATAR,
  UPDATE_USER_PASSWORD,
} from '../../graphql/mutations/user';
import { GET_TASKS } from '../../graphql/queries/tasksList';

import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';
import { handleValidateInput } from '../../utils/formValidator';

import { FormParagraph } from './styles/StyledForm';

import AvatarsForm from './subcomponents/AvatarsForm';
import ConfirmForm from './subcomponents/ConfirmForm';
import LoginForm from './subcomponents/LoginForm';
import Modal from '../Modal/Modal';
import PasswordForm from './subcomponents/PasswordForm';
import RegisterForm from './subcomponents/RegisterForm';
import TaskForm from './subcomponents/TaskForm';

const Form = ({
  addTaskForm,
  avatarsForm,
  confirmFormAccount,
  confirmFormTasksList,
  disableForm,
  editTaskData,
  editTaskForm,
  isModalOpenOnInit,
  loginForm,
  passwordForm,
}) => {
  const initFormDataState = {
    avatar: '',
    login: '',
    name: '',
    newPassword: '',
    oldPassword: '',
    ownAvatar: '',
    password: '',
    passwordRepeated: '',
    taskBody: '',
    taskFinishDate: '',
    taskPriority: '',
    uncategorizedErrors: '',
  };
  const [formData, setFormData] = useState(initFormDataState);
  const [formErrors, setFormErrors] = useState(initFormDataState);
  const [formType, setFormType] = useState(null);
  const [formSentSuccessfully, setFormSentSuccessfully] = useState(false);
  const [formWarnings, setFormWarnings] = useState(initFormDataState);

  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const user = useSelector((state) => state.auth.user);

  const checkWarningData = useRef(null);
  const elementToSetFocus = useRef(null);
  const lastActiveElement = useRef(null);
  const modalElementToSetFocus = useRef(null);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [loginUser, { data: dataLoginUser, loading: loadingLoginUser }] = useMutation(LOGIN_USER, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    update() {
      handleFormSent();
    },
  });

  const [registerUser, { loading: loadingRegisterUser }] = useMutation(REGISTER_USER, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    update() {
      handleFormSent();
    },
  });

  const [updateUserPassword, { data: dataUpdateUserPassword, loading: loadingUpdateUserPassword }] =
    useMutation(UPDATE_USER_PASSWORD, {
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
          handleSetErrors(err.graphQLErrors[0].message);
        } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
          handleSetErrors(err.graphQLErrors[0].extensions.errors);
        }
      },
      update() {
        handleFormSent();
      },
    });

  const [updateUserAvatar, { data: dataUpdateUserAvatar, loading: loadingUpdateUserAvatar }] =
    useMutation(UPDATE_USER_AVATAR, {
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
          handleSetErrors(err.graphQLErrors[0].message);
        } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
          handleSetErrors(err.graphQLErrors[0].extensions.errors);
        }
      },
      update() {
        handleFormSent();
      },
    });

  const [deleteUser, { loading: loadingDeleteUser }] = useMutation(DELETE_USER, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    update() {
      handleFormSent();
    },
  });

  const [addTask, { loading: loadingAddTask }] = useMutation(ADD_TASK, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    refetchQueries: [GET_TASKS, 'Query'],
    update() {
      handleFormSent();
    },
  });

  const [editTask, { loading: loadingEditTask }] = useMutation(EDIT_TASK, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    refetchQueries: [GET_TASKS, 'Query'],
    update() {
      handleFormSent();
      dispatch(clearCheckedTasks());
    },
  });

  const [deleteAllTasks, { loading: loadingDeleteAllTasks }] = useMutation(DELETE_ALL_TASKS, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        handleSetErrors(err.graphQLErrors[0].message);
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        handleSetErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    update() {
      handleFormSent();
      dispatch(resetTasksList());
    },
  });

  useEffect(() => {
    if (dataLoginUser) {
      dispatch(setUser(dataLoginUser.login));
    } else if (dataUpdateUserPassword) {
      dispatch(setUser(dataUpdateUserPassword.updateUserPassword));
    } else if (dataUpdateUserAvatar) {
      dispatch(setUser(dataUpdateUserAvatar.updateUserAvatar));
    }
  }, [dataLoginUser, dataUpdateUserAvatar, dataUpdateUserPassword, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [navigate, user]);

  useEffect(() => {
    if (editTaskData && editTaskData.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        taskBody: editTaskData[0].body,
        taskFinishDate: editTaskData[0].finishDate,
        taskPriority: editTaskData[0].priority,
      }));
    }
  }, [editTaskData]);

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
        }
      }, 100);
    } else if (elementToSetFocus.current) {
      elementToSetFocus.current.focus();
    } else if (lastActiveElement.current) {
      setTimeout(() => {
        lastActiveElement.current.focus();
      }, 100);
    }
  }, [formType, isModalOpen]);

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
    if (formType === 'confirmFormAccount' && formSentSuccessfully) {
      dispatch(closeAccountMenu());
      setTimeout(() => {
        dispatch(removeUser());
        dispatch(resetTasksList());
      }, 500);
    }
    handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
    checkWarningData.current = initFormDataState;
  };

  const handleUserInput = (e) => {
    if (e.target) {
      const name = e.target.name;
      if (e.target.type === 'radio') {
        const id = e.target.id;
        setFormData({ ...formData, [name]: id });
      } else {
        const value = e.target.value;
        setFormData({ ...formData, [name]: value });
        checkWarningData.current = { ...formData, [name]: value };
      }
    } else {
      setFormData({ ...formData, ownAvatar: e });
    }

    handleClearFormState([setFormWarnings]);
    const { warnings } = handleValidateInput(checkWarningData.current);
    handleSetWarnings(warnings);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleClearFormState([setFormErrors]);
    if (formType !== 'loginForm' && formType !== 'registerForm') {
      const isUserTokenExpired = checkUserTokenValidity();
      if (isUserTokenExpired) {
        dispatch(setIsUserTokenExpired(isUserTokenExpired));
        return;
      }
    }
    const { errors } = handleValidateInput(formData);
    handleSetErrors(errors);
    if (errors.length === 0) {
      if (formType === 'loginForm') {
        loginUser({ variables: { login: formData.login, password: formData.password } });
      } else if (formType === 'registerForm') {
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
      } else if (formType === 'passwordForm') {
        updateUserPassword({
          variables: {
            input: {
              oldPassword: formData.oldPassword,
              newPassword: formData.newPassword,
              newPasswordRepeated: formData.passwordRepeated,
            },
          },
        });
      } else if (formType === 'avatarsForm') {
        if (!formData.ownAvatar && !formData.avatar) {
          handleSetErrors([
            {
              ownAvatar: 'Wybierz jeden z kilku avatarów lub wgraj swój własny',
            },
          ]);
          return;
        } else {
          updateUserAvatar({
            variables: { avatar: formData.avatar, ownAvatar: formData.ownAvatar },
          });
        }
      } else if (formType === 'confirmFormAccount') {
        deleteUser();
      } else if (formType === 'addTaskForm') {
        addTask({
          variables: {
            input: {
              body: formData.taskBody,
              done: false,
              finishDate: formData.taskFinishDate,
              priority: formData.taskPriority,
            },
          },
        });
      } else if (formType === 'editTaskForm') {
        editTask({
          variables: {
            input: {
              body: formData.taskBody,
              finishDate: formData.taskFinishDate,
              priority: formData.taskPriority,
            },
            taskId: editTaskData[0].id,
          },
        });
      } else if (formType === 'confirmFormTasksList') {
        deleteAllTasks();
      }
    }
    setTimeout(() => {
      handleScrollModal();
    }, 1000);
  };

  const handleFormSent = () => {
    let shouldCloseModal = handleCloseModalOnSubmitForm();
    setFormSentSuccessfully(true);
    if (formType !== 'confirmFormAccount') {
      handleClearFormState([setFormData, setFormErrors, setFormWarnings]);
    }
    checkWarningData.current = initFormDataState;
    if (shouldCloseModal) {
      handleCloseModal();
    } else {
      handleScrollModal();
    }
  };

  const handleSetErrors = (errors) => {
    if (typeof errors === 'string') {
      setFormErrors((prevState) => ({
        ...prevState,
        uncategorizedErrors: 'Server error: ' + errors,
      }));
      return;
    }

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
              Wystąpiły poniższe błędy, popraw je i/lub spróbuj ponownie!
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
    if (
      formType === 'passwordForm' ||
      formType === 'registerForm' ||
      formType === 'avatarsForm' ||
      formType === 'confirmFormAccount'
    ) {
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
            loading={loadingLoginUser}
            loginValue={formData.login}
            passwordValue={formData.password}
            ref={elementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleOpenModal={handleOpenModal}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormType={setFormType}
          />
          <Modal handleCloseModal={handleCloseModal}>
            <RegisterForm
              avatarValue={formData.avatar}
              formErrors={formErrors}
              formSentSuccessfully={formSentSuccessfully}
              formType={formType}
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
            formSentSuccessfully={formSentSuccessfully}
            loading={loadingUpdateUserAvatar}
            ownAvatarValue={formData.ownAvatar}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormType={setFormType}
          />
        </Modal>
      )}
      {passwordForm && (
        <Modal handleCloseModal={handleCloseModal}>
          <PasswordForm
            formErrors={formErrors}
            formSentSuccessfully={formSentSuccessfully}
            formWarnings={formWarnings}
            loading={loadingUpdateUserPassword}
            newPasswordValue={formData.newPassword}
            newPasswordValueRepeated={formData.newPasswordRepeated}
            oldPasswordValue={formData.oldPassword}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormType={setFormType}
          />
        </Modal>
      )}
      {(addTaskForm || editTaskForm) && (
        <Modal handleCloseModal={handleCloseModal}>
          <TaskForm
            addTaskForm={addTaskForm}
            editTaskForm={editTaskForm}
            formErrors={formErrors}
            formWarnings={formWarnings}
            editTaskData={editTaskForm && editTaskData}
            loadingAddTask={loadingAddTask}
            loadingEditTask={loadingEditTask}
            taskBodyValue={formData.taskBody}
            taskFinishDateValue={formData.taskFinishDate}
            taskPriorityValue={formData.taskPriority}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            handleUserInput={handleUserInput}
            setFormType={setFormType}
          />
        </Modal>
      )}
      {(confirmFormTasksList || confirmFormAccount) && (
        <Modal handleCloseModal={handleCloseModal}>
          <ConfirmForm
            confirmFormAccount={confirmFormAccount}
            confirmFormTasksList={confirmFormTasksList}
            loadingDeleteAllTasks={loadingDeleteAllTasks}
            loadingDeleteUser={loadingDeleteUser}
            formSentSuccessfully={formSentSuccessfully}
            handleCloseModal={handleCloseModal}
            ref={modalElementToSetFocus}
            handleErrorInformation={handleErrorInformation}
            handleSubmitForm={handleSubmitForm}
            setFormType={setFormType}
          />
        </Modal>
      )}
    </>
  );
};

export default Form;
