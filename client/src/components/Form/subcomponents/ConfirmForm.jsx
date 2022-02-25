import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { ClearTasksListFormWrapper, Form, LoadingSpinner } from '../styles/StyledForm';

import SuccessInfo from './SuccessInfo';

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
        setFormType('confirmFormTasksList');
      } else if (confirmFormAccount) {
        setFormType('confirmFormAccount');
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
