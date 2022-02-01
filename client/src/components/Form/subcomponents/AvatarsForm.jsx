import React, { useEffect } from 'react';

import { Form } from '../styles/StyledForm';

import Avatars from './Avatars';

const AvatarsForm = React.forwardRef(
  (
    { avatarValue, handleErrorInformation, handleSubmitForm, handleUserInput, setFormKind },
    ref
  ) => {
    useEffect(() => {
      setFormKind('avatarsForm');
    }, [setFormKind]);

    return (
      <Form onSubmit={handleSubmitForm}>
        {handleErrorInformation()}
        <Avatars avatarValue={avatarValue} ref={ref} handleUserInput={handleUserInput} />
        <button type='submit'>Wybierz</button>
      </Form>
    );
  }
);

export default AvatarsForm;
