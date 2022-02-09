import { useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setHeaderHeight, toggleAccountMenu } from '../../redux/layoutSlice';

import * as Scroll from 'react-scroll';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowWidth from '../../hooks/useWindowWidth';

import { HeaderWrapper, Logo, NavMenuButton, Search } from './styles/StyledHeader';

const Header = () => {
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

  const header = useRef(null);

  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();

  let scroll = Scroll.animateScroll;

  useLayoutEffect(() => {
    dispatch(setHeaderHeight(header.current.getBoundingClientRect().height));
  }, [dispatch, windowWidth]);

  const handleScrollTop = () => {
    scroll.scrollToTop({ duration: 400 });
  };

  const handleToggleAccountMenu = () => {
    dispatch(toggleAccountMenu());
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
          type='text'
          placeholder='Szukane zadanie...'
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
