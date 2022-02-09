import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeLogoutTimeoutModal } from '../../redux/modalSlice';
import { removeUserAutoLoggedOut } from '../../redux/authSlice';

import { CloseButton, ModalContent, ModalWrapper } from './styles/StyledModal';

const Modal = ({ children, handleCloseModal, lastActiveElement, logoutTimeoutModal }) => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isUserAutoLoggedOut = useSelector((state) => state.auth.isUserAutoLoggedOut);
  const isUserTokenExpired = useSelector((state) => state.auth.isUserTokenExpired);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleCloseModalWithKeyboard = (e) => {
      if (!isLogoutTimeoutModalOpen && !logoutTimeoutModal) {
        if (e.code === 'Escape') {
          handleCloseModal();
        }
      }

      if (lastActiveElement) {
        if (e.code === 'Escape') {
          dispatch(closeLogoutTimeoutModal());
          lastActiveElement.focus();
          if (isUserAutoLoggedOut) {
            setTimeout(() => {
              dispatch(removeUserAutoLoggedOut());
            }, 500);
          }
        }
      }

      if (isUserTokenExpired) {
        if (e.code === 'Escape') {
          dispatch(closeLogoutTimeoutModal());
          if (isUserAutoLoggedOut) {
            setTimeout(() => {
              dispatch(removeUserAutoLoggedOut());
            }, 500);
          }
        }
      }
    };

    window.addEventListener('keydown', handleCloseModalWithKeyboard);

    return () => {
      window.removeEventListener('keydown', handleCloseModalWithKeyboard);
    };
  }, [
    dispatch,
    handleCloseModal,
    isLogoutTimeoutModalOpen,
    isUserAutoLoggedOut,
    isUserTokenExpired,
    lastActiveElement,
    logoutTimeoutModal,
  ]);

  const handleCloseLogoutTimeoutModal = (e) => {
    e.preventDefault();
    dispatch(closeLogoutTimeoutModal());

    if (lastActiveElement) {
      setTimeout(() => {
        lastActiveElement.focus();
      }, 100);
    }
    if (isUserAutoLoggedOut) {
      setTimeout(() => {
        dispatch(removeUserAutoLoggedOut());
      }, 500);
    }
  };

  return (
    <ModalWrapper isModalOpen={logoutTimeoutModal ? isLogoutTimeoutModalOpen : isModalOpen}>
      <ModalContent>
        <CloseButton>
          <button
            disabled={!logoutTimeoutModal && isLogoutTimeoutModalOpen}
            onClick={logoutTimeoutModal ? handleCloseLogoutTimeoutModal : handleCloseModal}>
            &times;
          </button>
        </CloseButton>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
