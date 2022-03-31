import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { ClearTasksListFormWrapper, Form, LoadingSpinner } from '../styles/StyledForm';

import SuccessInfo from './SuccessInfo';

import { CONFIRM_FORM_ACCOUNT_FORM_TYPE, CONFIRM_FORM_TASKSLIST_FORM_TYPE } from '../Form';

const ConfirmForm = React.forwardRef(
  (
    {
      confirmFormAccount,
      confirmFormTasksList,
      formSentSuccessfully,
      handleCloseModal,
      handleErrorInformation,
      handleSubmitForm,
      loadingDeleteAllTasks,
      loadingDeleteUser,
      setFormType,
    },
    ref
  ) => {
    const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    useEffect(() => {
      if (confirmFormTasksList) {
        setFormType(CONFIRM_FORM_TASKSLIST_FORM_TYPE);
      } else if (confirmFormAccount) {
        setFormType(CONFIRM_FORM_ACCOUNT_FORM_TYPE);
      }
    }, [confirmFormAccount, confirmFormTasksList, setFormType]);

    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Konto zostało usunięte</SuccessInfo>
        ) : (
          <Form isDarkModeActive={isDarkModeActive} onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            <ClearTasksListFormWrapper>
              <p>
                Ta operacja usunie {confirmFormTasksList && 'wszystkie zadania!'}{' '}
                {confirmFormAccount && 'konto użytkownika wraz ze wszystkimi zadaniami'}
              </p>
              <p>Czy na pewno chcesz to zrobić?</p>
              <button
                disabled={isLogoutTimeoutModalOpen || loadingDeleteUser}
                type='submit'
                ref={ref}>
                Potwierdź {(loadingDeleteUser || loadingDeleteAllTasks) && <LoadingSpinner />}
              </button>
              <button
                disabled={isLogoutTimeoutModalOpen || loadingDeleteUser}
                onClick={handleCloseModal}>
                Anuluj
              </button>
            </ClearTasksListFormWrapper>
          </Form>
        )}
      </>
    );
  }
);

export default ConfirmForm;
