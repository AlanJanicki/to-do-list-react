import React, { useEffect } from 'react';

import { Form, FormInput, FormParagraph, FormWrapper, Logo, Wrapper } from '../styles/StyledForm';

const LoginForm = React.forwardRef(
  (
    {
      formErrors,
      formWarnings,
      isModalOpen,
      handleErrorInformation,
      handleOpenModal,
      handleSubmitForm,
      handleUserInput,
      loginValue,
      passwordValue,
      setFormKind,
    },
    ref
  ) => {
    useEffect(() => {
      if (!isModalOpen) {
        setFormKind('loginForm');
      }
    }, [isModalOpen, setFormKind]);

    const handleOpenRegisterForm = (e) => {
      handleOpenModal(e);
      setFormKind('registerForm');
    };

    return (
      <Wrapper>
        <Logo>To-do List</Logo>
        <FormWrapper>
          <Form onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {formErrors.login && <FormParagraph error={true}>{formErrors.login}</FormParagraph>}
            <FormInput
              name='login'
              placeholder='Login'
              type='text'
              maxLength={15}
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
              name='password'
              placeholder='Hasło'
              type='password'
              maxLength={20}
              required
              value={passwordValue}
              onChange={(e) => handleUserInput(e)}
            />
            {formWarnings.password && (
              <FormParagraph warning={true}>{formWarnings.password}</FormParagraph>
            )}

            <button type='submit'>Zaloguj się</button>
            <button onClick={(e) => handleOpenRegisterForm(e)}>Utwórz nowe konto</button>
          </Form>
        </FormWrapper>
      </Wrapper>
    );
  }
);

export default LoginForm;
