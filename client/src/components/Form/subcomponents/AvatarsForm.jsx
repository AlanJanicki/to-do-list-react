import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Form, FormParagraph } from '../styles/StyledForm';
import { LoadingSpinner } from '../styles/StyledForm';

import Avatars from './Avatars';
import SuccessInfo from './SuccessInfo';

const AvatarsForm = React.forwardRef(
  (
    {
      avatarValue,
      formErrors,
      formSentSuccessfully,
      handleErrorInformation,
      handleSubmitForm,
      handleUserInput,
      loading,
      setFormType,
    },
    ref
  ) => {
    const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    useEffect(() => {
      setFormType('avatarsForm');
    }, [setFormType]);

    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Avatar został zmieniony</SuccessInfo>
        ) : (
          <Form isDarkModeActive={isDarkModeActive} onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {formErrors.avatar && <FormParagraph error={true}>{formErrors.avatar}</FormParagraph>}
            <Avatars avatarValue={avatarValue} ref={ref} handleUserInput={handleUserInput} />

            <button disabled={isLogoutTimeoutModalOpen || loading} type='submit'>
              Wybierz {loading && <LoadingSpinner />}
            </button>
          </Form>
        )}
      </>
    );
  }
);

export default AvatarsForm;
