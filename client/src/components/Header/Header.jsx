import { useEffect, useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setIsUserTokenExpired, setUser } from '../../redux/authSlice';
import { setHeaderHeight, toggleAccountMenu } from '../../redux/layoutSlice';
import { setSearchedTask, setTasksListErrors } from '../../redux/tasksListSlice';

import { useMutation } from '@apollo/client';
import { TOGGLE_DARK_MODE } from '../../graphql/mutations/user';

import * as Scroll from 'react-scroll';

import { faBars, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowWidth from '../../hooks/useWindowWidth';
import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';

import { DarkMode, HeaderWrapper, Logo, NavMenuButton, Panel, Search } from './styles/StyledHeader';

const Header = () => {
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const searchedTask = useSelector((state) => state.tasksList.searchedTask);
  const user = useSelector((state) => state.auth.user);

  const header = useRef(null);

  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();

  let scroll = Scroll.animateScroll;

  const [toggleDarkMode, { data: dataToggleDarkMode, loading: loadingToggleDarkMode }] =
    useMutation(TOGGLE_DARK_MODE, {
      onError(err) {
        console.log(err);
        if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
          dispatch(setTasksListErrors(err.graphQLErrors[0].message));
        } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
          dispatch(setTasksListErrors(err.graphQLErrors[0].extensions.errors));
        }
      },
    });

  useLayoutEffect(() => {
    dispatch(setHeaderHeight(header.current.getBoundingClientRect().height));
  }, [dispatch, windowWidth]);

  useEffect(() => {
    if (dataToggleDarkMode) {
      dispatch(setUser(dataToggleDarkMode.toggleDarkMode));
    }
  }, [dataToggleDarkMode, dispatch]);

  const handleScrollTop = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    scroll.scrollToTop({ duration: 400 });
  };

  const handleToggleIsDarkModeActive = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    toggleDarkMode({
      variables: {
        darkModeState: !user.enabledDarkMode,
      },
    });
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
    <HeaderWrapper isDarkModeActive={isDarkModeActive} ref={header}>
      <Panel>
        <Logo disabled={isModalOpen || isLogoutTimeoutModalOpen} onClick={handleScrollTop}>
          <h1>{windowWidth < 768 ? 'T-D' : 'To-do List'}</h1>
        </Logo>
        <DarkMode
          disabled={isModalOpen || isLogoutTimeoutModalOpen || loadingToggleDarkMode}
          isDarkModeActive={isDarkModeActive}
          onClick={handleToggleIsDarkModeActive}>
          <span>
            <FontAwesomeIcon icon={faSun} />
          </span>
          <span>
            <FontAwesomeIcon icon={faMoon} />
          </span>
          <span></span>
        </DarkMode>
      </Panel>
      <Search isDarkModeActive={isDarkModeActive} searchedTask={searchedTask}>
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
        isDarkModeActive={isDarkModeActive}
        onClick={handleToggleAccountMenu}>
        <FontAwesomeIcon icon={faBars} />
      </NavMenuButton>
    </HeaderWrapper>
  );
};

export default Header;
