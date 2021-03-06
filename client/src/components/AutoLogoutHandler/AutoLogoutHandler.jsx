import { useCallback, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  decrementAutoLogoutCounter,
  removeUser,
  resetAutoLogoutCounter,
  setUserAutoLoggedOut,
} from '../../redux/authSlice';
import { closeAccountMenu } from '../../redux/layoutSlice';
import {
  closeLogoutTimeoutModal,
  closeModal,
  openLogoutTimeoutModal,
} from '../../redux/modalSlice';
import { resetTasksList } from '../../redux/tasksListSlice';

import { debounce } from '../../utils/debounce';

import Modal from '../Modal/Modal';
import LogoutTimer from './subcomponents/LogoutTimer/LogoutTimer';

const AutoLogoutHandler = () => {
  const [isUserInactive, setIsUserInactive] = useState(false);

  const autoLogoutCounter = useSelector((state) => state.auth.autoLogoutCounter);
  const isUserAutoLoggedOut = useSelector((state) => state.auth.isUserAutoLoggedOut);
  const isUserTokenExpired = useSelector((state) => state.auth.isUserTokenExpired);
  const user = useSelector((state) => state.auth.user);

  const inactivityTimeout = useRef(null);
  const lastActiveElement = useRef(null);
  const logoutTimeout = useRef(null);
  const resetButton = useRef(null);
  const timer = useRef(null);

  const dispatch = useDispatch();

  const autoLogoutTimeout = 10000;
  const userIdleTime = 1800000;

  const handleAutoLogout = useCallback(() => {
    dispatch(closeAccountMenu());
    dispatch(closeModal());
    dispatch(closeLogoutTimeoutModal());
    dispatch(openLogoutTimeoutModal('resetWindowScrollY'));
    clearInterval(timer.current);
    clearTimeout(logoutTimeout.current);
    dispatch(removeUser());
    dispatch(resetAutoLogoutCounter());
    dispatch(setUserAutoLoggedOut(true));
    dispatch(resetTasksList());
    setIsUserInactive(false);
    inactivityTimeout.current = null;
    logoutTimeout.current = null;
  }, [dispatch]);

  const handleStartLogoutTimeout = useCallback(() => {
    dispatch(openLogoutTimeoutModal());
    setTimeout(() => {
      if (resetButton.current) {
        resetButton.current.focus();
      }
    }, 100);
    timer.current = setInterval(() => {
      dispatch(decrementAutoLogoutCounter());
    }, 1000);
    logoutTimeout.current = setTimeout(() => {
      handleAutoLogout();
    }, autoLogoutTimeout);
  }, [dispatch, handleAutoLogout]);

  const handleResetLogoutTimeout = () => {
    clearInterval(timer.current);
    clearTimeout(logoutTimeout.current);
    setIsUserInactive(false);
  };

  const handleClickResetButton = () => {
    if (resetButton.current) {
      resetButton.current.disabled = true;
    }
    handleResetLogoutTimeout();
    logoutTimeout.current = null;
    dispatch(resetAutoLogoutCounter());
    setTimeout(() => {
      if (resetButton.current) {
        resetButton.current.disabled = false;
      }
    }, 500);
  };

  const handleUserInactivity = () => {
    inactivityTimeout.current = setTimeout(() => {
      setIsUserInactive(true);
    }, userIdleTime);
  };

  const debouncedHandleUserActivity = debounce(() => {
    if (!logoutTimeout.current && inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
      handleUserInactivity();
    }
    return;
  }, 1000);

  const handleUserActivity = useCallback(() => {
    debouncedHandleUserActivity();
  }, [debouncedHandleUserActivity]);

  useEffect(() => {
    if (user) {
      inactivityTimeout.current = 'user';
      window.addEventListener('click', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      window.addEventListener('scroll', handleUserActivity);
      window.addEventListener('mousemove', handleUserActivity);
    } else if (!user) {
      clearInterval(timer.current);
      clearTimeout(inactivityTimeout.current);
      clearTimeout(logoutTimeout.current);
      if (autoLogoutCounter !== 10) {
        dispatch(resetAutoLogoutCounter());
      }
      setIsUserInactive(false);
      inactivityTimeout.current = null;
      logoutTimeout.current = null;
    }

    return () => {
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('mousemove', handleUserActivity);
    };
  }, [autoLogoutCounter, user, dispatch, handleUserActivity]);

  useEffect(() => {
    if (isUserInactive) {
      lastActiveElement.current = document.activeElement;
      handleStartLogoutTimeout();
    }
  }, [isUserInactive, handleStartLogoutTimeout]);

  useEffect(() => {
    if (isUserTokenExpired) {
      handleAutoLogout();
    }
  }, [handleAutoLogout, isUserTokenExpired]);

  return (
    <>
      {(user || isUserAutoLoggedOut) && (
        <Modal
          isUserInactive={isUserInactive}
          lastActiveElement={lastActiveElement}
          logoutTimeoutModal={true}
          handleAutoLogout={handleAutoLogout}>
          <LogoutTimer isUserAutoLoggedOut={isUserAutoLoggedOut}>
            {isUserAutoLoggedOut && !isUserTokenExpired
              ? 'Nast??pi??o automatyczne wylogowanie z powodu zbyt d??ugiego czasu bez aktywno??ci'
              : !isUserTokenExpired &&
                isUserInactive &&
                `Automatyczne wylogowanie z powodu braku aktywno??ci nastapi za: ${autoLogoutCounter}s`}
            {isUserAutoLoggedOut &&
              isUserTokenExpired &&
              'Nast??pi??o automatyczne wylogowanie z powodu wyga??ni??cia wa??no??ci tokena autoryzacyjnego'}
            {!isUserAutoLoggedOut && isUserInactive && (
              <button ref={resetButton} onClick={handleClickResetButton}>
                Przed??u?? sesj?? o 30min
              </button>
            )}
            {!isUserAutoLoggedOut && !isUserInactive && 'Sesja zosta??a przed??u??ona'}
          </LogoutTimer>
        </Modal>
      )}
    </>
  );
};

export default AutoLogoutHandler;
