import React, { useEffect } from 'react';

import { ClearTasksListFormWrapper, Form } from '../styles/StyledForm';

const ClearTasksListForm = React.forwardRef(
  ({ handleCloseModal, handleSubmitForm, isLogoutTimeoutModalOpen, setFormKind }, ref) => {
    useEffect(() => {
      setFormKind('clearTasksListForm');
    }, [setFormKind]);

    return (
      <Form onSubmit={handleSubmitForm}>
        <ClearTasksListFormWrapper>
          <p>
            Ta operacja usunie wszystkie zadania! <br /> Czy na pewno chcesz to zrobić?
          </p>
          <button disabled={isLogoutTimeoutModalOpen} type='submit' ref={ref}>
            Potwierdź
          </button>
          <button disabled={isLogoutTimeoutModalOpen} onClick={handleCloseModal}>
            Anuluj
          </button>
        </ClearTasksListFormWrapper>
      </Form>
    );
  }
);

export default ClearTasksListForm;
