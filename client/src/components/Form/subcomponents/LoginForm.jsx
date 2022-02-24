import React, { useEffect } from 'react';

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

const LoginForm = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);

    useEffect(() => {
      if (!isModalOpen) {
        setFormType('loginForm');
      }
    }, [isModalOpen, setFormType]);

    const handleOpenRegisterForm = (e) => {
      handleOpenModal(e);
      setFormType('registerForm');
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
              ref={ref}
              onChange={(e) => handleUserInput(e)}
            />
            {formWarnings.login && (
              <FormParagraph warning={true}>{formWarnings.login}</FormParagraph>
            )}

            {formErrors.password && (
              <FormParagraph error={true}>{formErrors.password}</FormParagraph>
            )}
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
  }
);

export default LoginForm;
