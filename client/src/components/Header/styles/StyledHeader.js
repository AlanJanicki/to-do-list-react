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
  background-color: #f7f7f7;

  @media (min-width: 992px) {
    padding: 20px 0;
  }
`;

export const Logo = styled.h1`
  button {
    background: none;
    border: none;
    color: #ee7300;
    font-size: 1.6rem;
    font-weight: 900;
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

export const Search = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
    flex-grow: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
  }

  input:focus {
    border: 1px solid #ee7300;
    outline: 0;
  }

  span {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    flex-basis: 60%;
  }
`;

export const NavMenuButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.isAccountMenuOpen ? '#ee7300' : '#4C8077')};
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
