import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../redux/authSlice';
import { closeAccountMenu, setAccountMenuHeight } from '../../redux/layoutSlice';
import { resetTasksList } from '../../redux/tasksListSlice';

import useWindowWidth from '../../hooks/useWindowWidth';

import { Menu } from './styles/StyledAccountMenu';

import Form from '../Form/Form';

const AccountMenu = () => {
  const [removedOutline, setRemovedOutline] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const controlPanelHeight = useSelector((state) => state.layout.controlPanelHeight);
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const accountMenu = useRef(null);
  const elementToFocus = useRef(null);
  const lastActiveElement = useRef(null);

  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (accountMenu.current) {
      setTimeout(() => {
        dispatch(setAccountMenuHeight(accountMenu.current.getBoundingClientRect().height));
      }, 1);
    }
  }, [dispatch, windowWidth]);

  useEffect(() => {
    if (isAccountMenuOpen) {
      lastActiveElement.current = document.activeElement;
      elementToFocus.current.focus();
      setRemovedOutline(true);
    } else if (lastActiveElement.current) {
      lastActiveElement.current.focus();
    }
  }, [isAccountMenuOpen, isLogoutTimeoutModalOpen]);

  useEffect(() => {
    const handleCloseMenuWithKeyboard = (e) => {
      if (e.code === 'Escape' && !isModalOpen && !isLogoutTimeoutModalOpen && isAccountMenuOpen) {
        dispatch(closeAccountMenu());
      }
    };

    window.addEventListener('keydown', handleCloseMenuWithKeyboard);

    return () => {
      window.removeEventListener('keydown', handleCloseMenuWithKeyboard);
    };
  }, [dispatch, isAccountMenuOpen, isLogoutTimeoutModalOpen, isModalOpen]);

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.getAttribute('data-option'));
  };

  const handleUnselectOption = () => {
    setTimeout(() => {
      setSelectedOption(null);
    }, 500);
  };

  const handleLogoutUser = () => {
    dispatch(closeAccountMenu());
    setTimeout(() => {
      dispatch(removeUser());
      dispatch(resetTasksList());
    }, 500);
  };

  return (
    <>
      <Menu
        controlPanelHeight={controlPanelHeight}
        headerHeight={headerHeight}
        isAccountMenuOpen={isAccountMenuOpen}
        isDarkModeActive={isDarkModeActive}
        removedOutline={removedOutline}
        ref={accountMenu}>
        <button
          data-option='changePassword'
          disabled={isModalOpen || isLogoutTimeoutModalOpen}
          tabIndex={!isAccountMenuOpen ? -1 : null}
          ref={elementToFocus}
          onClick={handleSelectOption}
          onFocus={() => {
            setRemovedOutline(false);
          }}>
          Zmień hasło
        </button>
        <button
          data-option='changeAvatar'
          disabled={isModalOpen || isLogoutTimeoutModalOpen}
          tabIndex={!isAccountMenuOpen ? -1 : null}
          onClick={handleSelectOption}>
          Zmień avatar
        </button>
        <button
          data-option='deleteAccount'
          disabled={isModalOpen || isLogoutTimeoutModalOpen}
          tabIndex={!isAccountMenuOpen ? -1 : null}
          onClick={handleSelectOption}>
          Usuń konto
        </button>
        <button
          data-option='logout'
          disabled={isModalOpen || isLogoutTimeoutModalOpen}
          tabIndex={!isAccountMenuOpen ? -1 : null}
          onClick={handleLogoutUser}>
          Wyloguj się
        </button>
      </Menu>

      {selectedOption === 'changePassword' && (
        <Form isModalOpenOnInit={true} passwordForm={true} disableForm={handleUnselectOption} />
      )}
      {selectedOption === 'changeAvatar' && (
        <Form avatarsForm={true} isModalOpenOnInit={true} disableForm={handleUnselectOption} />
      )}
      {selectedOption === 'deleteAccount' && (
        <Form
          confirmFormAccount={true}
          isModalOpenOnInit={true}
          disableForm={handleUnselectOption}
        />
      )}
    </>
  );
};

export default AccountMenu;
