import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  padding: 10px 0;
  color: #54433a;
  background-color: ${(props) => (props.isDarkModeActive ? '#171a22' : '#f7f7f7')};

  @media (min-width: 992px) {
    padding: 20px 0;
  }

  @media print {
    display: none;
  }
`;

export const Panel = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled.button`
  background: none;
  border: none;
  color: #ee7300;
  cursor: pointer;

  &:focus {
    outline: 1px solid #ee7300;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &:focus-visible {
    outline: 1px solid #ee7300;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 900;

    @media (min-width: 768px) {
      font-size: 1.8rem;
    }

    @media (min-width: 1200px) {
      font-size: 2rem;
    }

    @media (min-width: 1400px) {
      font-size: 2.5rem;
    }
  }
`;

export const DarkMode = styled.button`
  position: relative;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3px;
  width: 35px;
  height: 20px;
  background-color: ${(props) => (props.isDarkModeActive ? '#c5c7cb' : '#fff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  span {
    font-size: 0.8rem;

    &:nth-of-type(1) {
      color: #ffd36e;
    }

    &:nth-of-type(2) {
      color: #000;
    }

    &:nth-of-type(3) {
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${(props) => (props.isDarkModeActive ? '#ffd36e' : '#5f5f5f')};
      transform: ${(props) => (props.isDarkModeActive ? 'translateX(0)' : 'translateX(15px)')};
      transition: transform 0.3s ease, background-color 0.6s ease;

      @media (min-width: 375px) {
        transform: ${(props) => (props.isDarkModeActive ? 'translateX(0)' : 'translateX(19px)')};
      }
    }
  }

  &:focus {
    outline: 1px solid #ee7300;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &:focus-visible {
    outline: 1px solid #ee7300;
  }

  @media (min-width: 375px) {
    padding: 0 6px;
    width: 45px;
    height: 20px;
  }
`;

export const Search = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
    max-width: 150px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    color: ${(props) => props.isDarkModeActive && '#e2e2e2'};
    background-color: ${(props) => props.isDarkModeActive && '#0e1217'};

    &::placeholder {
      color: ${(props) => props.isDarkModeActive && '#919191'};
    }

    &:focus {
      border: 1px solid #ee7300;
      outline: 0;
    }

    @media (min-width: 375px) {
      max-width: unset;
      flex-grow: 1;
    }
  }

  span {
    font-size: 1.2rem;
    color: ${(props) =>
      props.isDarkModeActive && props.searchedTask.length === 0
        ? '#919191'
        : props.isDarkModeActive && props.searchedTask.length > 0 && '#c5c7cb'};
  }
`;

export const NavMenuButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => {
    if (props.isDarkModeActive) {
      return '#4C8077';
    } else {
      return props.isAccountMenuOpen ? '#ee7300' : '#4C8077';
    }
  }};
  font-size: 1.2rem;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      color: #ee7300;
    }
  }

  &:focus {
    outline: 1px solid #ee7300;
  }

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  &:focus-visible {
    outline: 1px solid #ee7300;
  }
`;
