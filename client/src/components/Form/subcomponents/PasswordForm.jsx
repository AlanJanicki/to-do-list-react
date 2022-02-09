import React, { useEffect } from 'react';

import { Form, FormInput, FormParagraph } from '../styles/StyledForm';

import SuccessInfo from './SuccessInfo';

const PasswordForm = React.forwardRef(
  (
    {
      formErrors,
      formSentSuccessfully,
      formWarnings,
      handleErrorInformation,
      handleUserInput,
      handleSubmitForm,
      isLogoutTimeoutModalOpen,
      newPasswordValue,
      newPasswordValueRepeated,
      oldPasswordValue,
      setFormKind,
    },
    ref
  ) => {
    useEffect(() => {
      setFormKind('passwordForm');
    }, [setFormKind]);

    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Hasło zostało zmienione</SuccessInfo>
        ) : (
          <Form onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {formErrors.oldPassword && (
              <FormParagraph error={true}>{formErrors.oldPassword}</FormParagraph>
            )}
            <FormInput
              disabled={isLogoutTimeoutModalOpen}
              name='oldPassword'
              type='password'
              placeholder='Stare hasło'
              maxLength={20}
              required
              value={oldPasswordValue}
              ref={ref}
              onChange={(e) => handleUserInput(e)}
            />
            {formWarnings.oldPassword && (
              <FormParagraph warning={true}>{formWarnings.oldPassword}</FormParagraph>
            )}

            {formErrors.newPassword && (
              <FormParagraph error={true}>{formErrors.newPassword}</FormParagraph>
            )}
            <FormInput
              disabled={isLogoutTimeoutModalOpen}
              name='newPassword'
              type='password'
              placeholder='Nowe hasło'
              maxLength={20}
              required
              value={newPasswordValue}
              onChange={(e) => handleUserInput(e)}
            />
            {newPasswordValue.length === 0 && (
              <FormParagraph warning={true}>
                Wskazówka bezpieczeństwa: proszę użyć hasła, które nie jest używane w innych
                serwisach.
              </FormParagraph>
            )}
            {formWarnings.newPassword && (
              <FormParagraph warning={true}>{formWarnings.newPassword}</FormParagraph>
            )}

            {formErrors.passwordRepeated && (
              <FormParagraph error={true}>{formErrors.passwordRepeated}</FormParagraph>
            )}
            <FormInput
              disabled={isLogoutTimeoutModalOpen}
              name='passwordRepeated'
              type='password'
              placeholder='Powtórz hasło'
              maxLength={20}
              required
              value={newPasswordValueRepeated}
              onChange={(e) => handleUserInput(e)}
            />

            <button disabled={isLogoutTimeoutModalOpen} type='submit'>
              Zatwierdź
            </button>
          </Form>
        )}
      </>
    );
  }
);

export default PasswordForm;
