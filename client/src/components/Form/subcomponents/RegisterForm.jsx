import React from 'react';

import { Form, FormInput, FormParagraph, LoadingSpinner } from '../styles/StyledForm';

import Avatars from './Avatars';
import SuccessInfo from './SuccessInfo';

const RegisterForm = React.forwardRef(
  (
    {
      avatarValue,
      formErrors,
      formSentSuccessfully,
      formWarnings,
      handleErrorInformation,
      handleSubmitForm,
      handleUserInput,
      loading,
      loginValue,
      nameValue,
      passwordRepeatedValue,
      passwordValue,
    },
    ref
  ) => {
    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Konto zostało utworzone! Możesz się zalogować.</SuccessInfo>
        ) : (
          <Form onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {formErrors.name && <FormParagraph error={true}>{formErrors.name}</FormParagraph>}
            <FormInput
              name='name'
              type='text'
              placeholder='Imię'
              maxLength={50}
              required
              value={nameValue}
              ref={ref}
              onChange={(e) => handleUserInput(e)}
            />
            {formWarnings.name && <FormParagraph warning={true}>{formWarnings.name}</FormParagraph>}

            {formErrors.login && <FormParagraph error={true}>{formErrors.login}</FormParagraph>}
            <FormInput
              name='login'
              type='text'
              placeholder='Login'
              maxLength={15}
              required
              value={loginValue}
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
              type='password'
              placeholder='Hasło'
              maxLength={20}
              required
              value={passwordValue}
              onChange={(e) => handleUserInput(e)}
            />
            {passwordValue.length === 0 && (
              <FormParagraph warning={true}>
                Wskazówka bezpieczeństwa: proszę użyć hasła, które nie jest używane w innych
                serwisach.
              </FormParagraph>
            )}
            {formWarnings.password && (
              <FormParagraph warning={true}>{formWarnings.password}</FormParagraph>
            )}

            {formErrors.passwordRepeated && (
              <FormParagraph error={true}>{formErrors.passwordRepeated}</FormParagraph>
            )}
            <FormInput
              name='passwordRepeated'
              type='password'
              placeholder='Powtórz hasło'
              maxLength={20}
              required
              value={passwordRepeatedValue}
              onChange={(e) => handleUserInput(e)}
            />
            <Avatars avatarValue={avatarValue} handleUserInput={handleUserInput} />

            <button type='submit'>Utwórz konto{loading && <LoadingSpinner />}</button>
          </Form>
        )}
      </>
    );
  }
);

export default RegisterForm;
