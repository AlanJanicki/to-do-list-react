import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  overflow: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isModalOpen ? '1' : '0')};
  visibility: ${(props) => (props.isModalOpen ? 'visible' : 'hidden')};
  transition: visibility 0.5s ease, opacity 0.5s ease;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  display: flex;
  max-width: 1000px;
  max-height: 90%;
  flex-direction: column;
  padding: 20px;
  border: ${(props) => (props.isDarkModeActive ? '1px solid #171a22' : '1px solid #f7f7f7')};
  border-radius: 5px;
  background-color: ${(props) => (props.isDarkModeActive ? '#0e1217' : '#fff')};
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
    color: ${(props) => (props.isDarkModeActive ? '#4C8077' : '#aaa')};
    background: none;
    font-size: 28px;
    font-weight: bold;
    outline-offset: -2px;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        color: #000;
        text-decoration: none;
      }
    }

    &:focus {
      outline: 1px solid #ee7300;
    }
  }
`;
