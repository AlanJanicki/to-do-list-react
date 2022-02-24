import { useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setIsUserTokenExpired } from '../../redux/authSlice';
import { setHeaderHeight, toggleAccountMenu } from '../../redux/layoutSlice';
import { setSearchedTask } from '../../redux/tasksListSlice';

import * as Scroll from 'react-scroll';

import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowWidth from '../../hooks/useWindowWidth';
import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';

import { HeaderWrapper, Logo, NavMenuButton, Search } from './styles/StyledHeader';

const Header = () => {
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const searchedTask = useSelector((state) => state.tasksList.searchedTask);

  const header = useRef(null);

  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();

  let scroll = Scroll.animateScroll;

  useLayoutEffect(() => {
    dispatch(setHeaderHeight(header.current.getBoundingClientRect().height));
  }, [dispatch, windowWidth]);

  const handleScrollTop = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    scroll.scrollToTop({ duration: 400 });
  };

  const handleToggleAccountMenu = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(toggleAccountMenu());
  };

  const handleUserInput = (e) => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(setSearchedTask(e.target.value));
  };

  return (
    <HeaderWrapper ref={header}>
      <Logo onClick={handleScrollTop}>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>
          {windowWidth < 768 ? 'T-D' : 'To-do List'}
        </button>
      </Logo>
      <Search>
        <input
          disabled={isModalOpen || isLogoutTimeoutModalOpen}
          placeholder='Szukane zadanie...'
          type='text'
          value={searchedTask}
          onChange={(e) => handleUserInput(e)}
        />
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </Search>
      <NavMenuButton
        disabled={isModalOpen || isLogoutTimeoutModalOpen}
        title={'Menu użytkownika'}
        isAccountMenuOpen={isAccountMenuOpen}
        onClick={handleToggleAccountMenu}>
        <FontAwesomeIcon icon={faBars} />
      </NavMenuButton>
    </HeaderWrapper>
  );
};

export default Header;
