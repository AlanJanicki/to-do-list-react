import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import {
  Form,
  FormInput,
  FormParagraph,
  FormWrapper,
  LoadingSpinner,
  Logo,
  Wrapper,
} from '../styles/StyledForm';

import { LOGIN_FORM_FORM_TYPE, REGISTER_FORM_FORM_TYPE } from '../Form';

const LoginForm = ({
  formErrors,
  formWarnings,
  handleErrorInformation,
  handleOpenModal,
  handleSubmitForm,
  handleUserInput,
  loading,
  loginValue,
  passwordValue,
  setFormType,
}) => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const loginInput = useRef(null);

  useEffect(() => {
    if (!isModalOpen) {
      setFormType(LOGIN_FORM_FORM_TYPE);
    }
  }, [isModalOpen, setFormType]);

  useEffect(() => {
    if (loginInput.current && !isLogoutTimeoutModalOpen) {
      loginInput.current.focus();
    }
  }, [isLogoutTimeoutModalOpen]);

  const handleOpenRegisterForm = (e) => {
    handleOpenModal(e);
    setFormType(REGISTER_FORM_FORM_TYPE);
  };

  return (
    <Wrapper>
      <Logo>To-do List</Logo>
      <FormWrapper>
        <Form onSubmit={handleSubmitForm}>
          {handleErrorInformation()}
          {formErrors.login && <FormParagraph error={true}>{formErrors.login}</FormParagraph>}
          <FormInput
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            name='login'
            maxLength={15}
            placeholder='Login'
            type='text'
            required
            value={loginValue}
            errorBorder={formErrors.login}
            ref={loginInput}
            onChange={(e) => handleUserInput(e)}
          />
          {formWarnings.login && <FormParagraph warning={true}>{formWarnings.login}</FormParagraph>}

          {formErrors.password && <FormParagraph error={true}>{formErrors.password}</FormParagraph>}
          <FormInput
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            maxLength={20}
            name='password'
            placeholder='Hasło'
            type='password'
            required
            value={passwordValue}
            onChange={(e) => handleUserInput(e)}
          />
          {formWarnings.password && (
            <FormParagraph warning={true}>{formWarnings.password}</FormParagraph>
          )}

          <button disabled={isModalOpen || isLogoutTimeoutModalOpen || loading} type='submit'>
            Zaloguj się
            {loading && <LoadingSpinner />}
          </button>
          <button
            disabled={isModalOpen || isLogoutTimeoutModalOpen || loading}
            onClick={(e) => handleOpenRegisterForm(e)}>
            Utwórz nowe konto
          </button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};
export default LoginForm;
