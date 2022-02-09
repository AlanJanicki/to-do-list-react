import React, { useEffect } from 'react';

import { Form, FormParagraph } from '../styles/StyledForm';

import Avatars from './Avatars';

const AvatarsForm = React.forwardRef(
  (
    {
      avatarValue,
      formErrors,
      handleErrorInformation,
      handleSubmitForm,
      handleUserInput,
      isLogoutTimeoutModalOpen,
      setFormKind,
    },
    ref
  ) => {
    useEffect(() => {
      setFormKind('avatarsForm');
    }, [setFormKind]);

    return (
      <Form onSubmit={handleSubmitForm}>
        {handleErrorInformation()}
        {formErrors.avatar && <FormParagraph error={true}>{formErrors.avatar}</FormParagraph>}
        <Avatars avatarValue={avatarValue} ref={ref} handleUserInput={handleUserInput} />

        <button type='submit' disabled={isLogoutTimeoutModalOpen}>
          Wybierz
        </button>
      </Form>
    );
  }
);

export default AvatarsForm;
