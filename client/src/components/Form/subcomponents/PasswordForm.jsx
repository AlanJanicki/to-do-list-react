import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Form, FormInput, FormParagraph } from '../styles/StyledForm';
import { LoadingSpinner } from '../styles/StyledForm';

import SuccessInfo from './SuccessInfo';

import { PASSWORD_FORM_FORM_TYPE } from '../Form';

const PasswordForm = React.forwardRef(
  (
    {
      formErrors,
      formSentSuccessfully,
      formWarnings,
      handleErrorInformation,
      handleUserInput,
      handleSubmitForm,
      loading,
      newPasswordValue,
      newPasswordValueRepeated,
      oldPasswordValue,
      setFormType,
    },
    ref
  ) => {
    const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    useEffect(() => {
      setFormType(PASSWORD_FORM_FORM_TYPE);
    }, [setFormType]);

    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Hasło zostało zmienione</SuccessInfo>
        ) : (
          <Form isDarkModeActive={isDarkModeActive} onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {formErrors.oldPassword && (
              <FormParagraph error={true}>{formErrors.oldPassword}</FormParagraph>
            )}
            <FormInput
              disabled={isLogoutTimeoutModalOpen}
              maxLength={20}
              name='oldPassword'
              type='password'
              placeholder='Stare hasło'
              required
              value={oldPasswordValue}
              isDarkModeActive={isDarkModeActive}
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
              maxLength={20}
              name='newPassword'
              type='password'
              placeholder='Nowe hasło'
              required
              value={newPasswordValue}
              isDarkModeActive={isDarkModeActive}
              onChange={(e) => handleUserInput(e)}
            />
            {newPasswordValue.length === 0 && (
              <FormParagraph warning={true}>
                Wskazówka bezpieczeństwa: proszę użyć hasła, które nie jest używane w innych
                serwisach
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
              maxLength={20}
              name='passwordRepeated'
              type='password'
              placeholder='Powtórz hasło'
              required
              value={newPasswordValueRepeated}
              isDarkModeActive={isDarkModeActive}
              onChange={(e) => handleUserInput(e)}
            />

            <button disabled={isLogoutTimeoutModalOpen || loading} type='submit'>
              Zatwierdź {loading && <LoadingSpinner />}
            </button>
          </Form>
        )}
      </>
    );
  }
);

export default PasswordForm;
