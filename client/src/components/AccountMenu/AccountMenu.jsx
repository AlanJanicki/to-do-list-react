import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { closeAccountMenu, setAccountMenuHeight } from '../../redux/layoutSlice';

import useWindowWidth from '../../hooks/useWindowWidth';

import { Menu } from './styles/StyledAccountMenu';

import Form from '../Form/Form';

const AccountMenu = () => {
  const [removedOutline, setRemovedOutline] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const accountMenu = useRef(null);
  const elementToFocus = useRef(null);
  const lastActiveElement = useRef(null);

  const dispatch = useDispatch();
  const controlPanelHeight = useSelector((state) => state.layout.controlPanelHeight);
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const windowWidth = useWindowWidth();

  useLayoutEffect(() => {
    dispatch(setAccountMenuHeight(accountMenu.current.getBoundingClientRect().height));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    if (isAccountMenuOpen) {
      lastActiveElement.current = document.activeElement;
      elementToFocus.current.focus();
      setRemovedOutline(true);
    } else if (lastActiveElement.current) {
      lastActiveElement.current.focus();
    }
  }, [isAccountMenuOpen]);

  useEffect(() => {
    const handleCloseMenuWithKeyboard = (e) => {
      if (e.code === 'Escape' && !isModalOpen) {
        dispatch(closeAccountMenu());
      }
    };

    window.addEventListener('keydown', handleCloseMenuWithKeyboard);

    return () => {
      window.removeEventListener('keydown', handleCloseMenuWithKeyboard);
    };
  }, [dispatch, isModalOpen]);

  const handleSelectOption = (e) => {
    setSelectedOption(e.target.getAttribute('data-option'));
  };

  const handleUnselectOption = () => {
    setTimeout(() => {
      setSelectedOption(null);
    }, 500);
  };

  return (
    <>
      <Menu
        controlPanelHeight={controlPanelHeight}
        headerHeight={headerHeight}
        isAccountMenuOpen={isAccountMenuOpen}
        removedOutline={removedOutline}
        ref={accountMenu}>
        <button
          data-option='changePassword'
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
          tabIndex={!isAccountMenuOpen ? -1 : null}
          onClick={handleSelectOption}>
          Zmień avatar
        </button>
        <button data-option='logout' tabIndex={!isAccountMenuOpen ? -1 : null}>
          Wyloguj się
        </button>
      </Menu>

      {selectedOption === 'changePassword' && (
        <Form isModalOpenOnInit={true} passwordForm={true} disableForm={handleUnselectOption} />
      )}
      {selectedOption === 'changeAvatar' && (
        <Form avatarsForm={true} isModalOpenOnInit={true} disableForm={handleUnselectOption} />
      )}
    </>
  );
};

export default AccountMenu;
