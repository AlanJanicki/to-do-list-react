import styled from 'styled-components';

export const Menu = styled.ul`
  position: fixed;
  z-index: 1;
  top: ${(props) =>
    props.isAccountMenuOpen
      ? `${props.headerHeight + props.controlPanelHeight}px`
      : `-${props.headerHeight + props.controlPanelHeight}px`};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  list-style: none;
  transition: top 0.5s ease;

  button {
    flex-basis: 100%;
    padding: 15px 0;
    border: none;
    border-bottom: 1px solid #dfe0df;
    color: #fff;
    background-color: #ee7300;
    font-weight: bold;
    text-align: center;
    -webkit-text-size-adjust: 100%;
    cursor: pointer;
    outline-offset: -6px;

    &:focus {
      outline: 1px solid #fff;
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    &:focus-visible {
      outline: 1px solid #fff;
    }

    &:nth-of-type(1) {
      outline: ${(props) => props.removedOutline && 'none'};
    }

    @media (hover: hover) {
      &:hover {
        text-decoration: underline;
      }
    }

    @media (min-width: 576px) {
      flex-basis: 30%;
      flex-grow: 1;
      padding: 20px 0;
    }

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }
  }
`;
