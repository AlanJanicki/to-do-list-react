import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { closeLogoutTimeoutModal } from '../../redux/modalSlice';
import { setUserAutoLoggedOut } from '../../redux/authSlice';

import { CloseButton, ModalContent, ModalWrapper } from './styles/StyledModal';

const Modal = ({
  children,
  handleAutoLogout,
  handleCloseModal,
  isUserInactive,
  lastActiveElement,
  logoutTimeoutModal,
}) => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isUserAutoLoggedOut = useSelector((state) => state.auth.isUserAutoLoggedOut);
  const isUserTokenExpired = useSelector((state) => state.auth.isUserTokenExpired);
  const user = useSelector((state) => state.auth.user);

  let isDarkModeActive = user ? user.enabledDarkMode : false;

  const dispatch = useDispatch();

  useEffect(() => {
    const handleCloseModalWithKeyboard = (e) => {
      if (!isLogoutTimeoutModalOpen && !logoutTimeoutModal) {
        if (e.code === 'Escape') {
          handleCloseModal();
        }
      } else if (isLogoutTimeoutModalOpen && lastActiveElement) {
        if (e.code === 'Escape') {
          if (isUserInactive) {
            handleAutoLogout();
          } else {
            dispatch(closeLogoutTimeoutModal());
            if (lastActiveElement.current) {
              lastActiveElement.current.focus();
            }
            setTimeout(() => {
              dispatch(setUserAutoLoggedOut(false));
            }, 500);
          }
        }

        if (isUserTokenExpired) {
          if (e.code === 'Escape') {
            dispatch(closeLogoutTimeoutModal());
            if (isUserAutoLoggedOut) {
              setTimeout(() => {
                dispatch(setUserAutoLoggedOut(false));
              }, 500);
            }
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
    handleAutoLogout,
    handleCloseModal,
    isLogoutTimeoutModalOpen,
    isUserAutoLoggedOut,
    isUserInactive,
    isUserTokenExpired,
    lastActiveElement,
    logoutTimeoutModal,
  ]);

  const handleCloseLogoutTimeoutModal = (e) => {
    e.preventDefault();

    if (isUserInactive) {
      handleAutoLogout();
    } else if (lastActiveElement) {
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
      }
      dispatch(closeLogoutTimeoutModal());
      setTimeout(() => {
        dispatch(setUserAutoLoggedOut(false));
      }, 500);
    }
  };

  return (
    <ModalWrapper isModalOpen={logoutTimeoutModal ? isLogoutTimeoutModalOpen : isModalOpen}>
      <ModalContent isDarkModeActive={isDarkModeActive}>
        <CloseButton isDarkModeActive={isDarkModeActive}>
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
