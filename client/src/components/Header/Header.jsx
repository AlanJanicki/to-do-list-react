import { useLayoutEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as Scroll from 'react-scroll';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowWidth from '../../hooks/useWindowWidth';

import { setHeaderHeight, toggleAccountMenu } from '../../redux/layoutSlice';

import { HeaderWrapper, Logo, NavMenuButton, Search } from './styles/StyledHeader';

const Header = () => {
  const header = useRef(null);

  const dispatch = useDispatch();
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);

  const windowWidth = useWindowWidth();

  let scroll = Scroll.animateScroll;

  useLayoutEffect(() => {
    dispatch(setHeaderHeight(header.current.getBoundingClientRect().height));
  }, [dispatch, windowWidth]);

  const handleScrollTop = () => {
    scroll.scrollToTop({ duration: 400 });
  };

  return (
    <HeaderWrapper ref={header}>
      <Logo onClick={handleScrollTop}>
        <button>{windowWidth < 768 ? 'T-D' : 'To-do List'}</button>
      </Logo>
      <Search>
        <input type='text' placeholder='Szukane zadanie...' />
        <span>
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </Search>
      <NavMenuButton
        title={'Menu użytkownika'}
        isAccountMenuOpen={isAccountMenuOpen}
        onClick={() => dispatch(toggleAccountMenu())}>
        <FontAwesomeIcon icon={faBars} />
      </NavMenuButton>
    </HeaderWrapper>
  );
};

export default Header;
