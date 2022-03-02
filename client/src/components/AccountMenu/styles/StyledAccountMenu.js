import styled from 'styled-components';

export const Menu = styled.ul`
  position: fixed;
  z-index: 1;
  top: ${(props) =>
    props.isAccountMenuOpen
      ? `${props.headerHeight + props.controlPanelHeight}px`
      : `-${props.headerHeight + props.controlPanelHeight}px`};
  display: ${(props) => (props.controlPanelHeight && props.headerHeight ? 'flex' : 'none')};
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  border-top: ${(props) => props.isDarkModeActive && '1px solid #919191'};
  list-style: none;
  transition: top 0.5s ease;

  button {
    flex-basis: 100%;
    padding: 15px 0;
    border: none;
    border-bottom: ${(props) =>
      props.isDarkModeActive ? '1px solid #0e1217' : '1px solid #dfe0df'};
    color: ${(props) => (props.isDarkModeActive ? '#ee7300' : '#fff')};
    background-color: ${(props) => (props.isDarkModeActive ? '#171a22' : '#ee7300')};
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    outline-offset: -5px;

    &:focus {
      outline: ${(props) => (props.isDarkModeActive ? '1px solid #ee7300' : '1px solid #fff')};
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    &:focus-visible {
      outline: ${(props) => (props.isDarkModeActive ? '1px solid #ee7300' : '1px solid #fff')};
    }

    &:nth-of-type(1) {
      outline: ${(props) => props.removedOutline && '0'};
    }

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
        color: ${(props) => props.isDarkModeActive && '#e2e2e2'};
      }
    }

    @media (min-width: 576px) {
      flex-basis: 25%;
      flex-grow: 1;
      padding: 20px 0;
    }

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }

    @media print {
      display: none;
    }
  }
`;
