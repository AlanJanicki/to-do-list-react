import styled from 'styled-components';

export const LogoutTimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ee7300;
  text-align: center;

  span {
    margin-bottom: 10px;
    color: ${(props) => (props.isUserAutoLoggedOut ? 'red' : '#288600')};
    font-size: 4rem;

    @media (min-width: 768px) {
      margin-bottom: 20px;
    }

    @media (min-width: 1400px) {
      font-size: 6rem;
    }
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }

  @media (min-width: 1400px) {
    font-size: 1.2rem;
  }

  button {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 10px;
    width: 70vw;
    max-width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;

    &:focus {
      border: 2px solid #ee7300;
      outline: 0;
    }

    &:nth-of-type(1) {
      background-color: #ee7300;
    }

    &:nth-of-type(2) {
      background-color: #ffa95d;
    }

    @media (min-width: 768px) {
      width: 65vw;
      font-size: 1.2rem;
    }

    @media (min-width: 992px) {
      margin-left: auto;
      margin-right: auto;
      max-width: 85%;
    }
  }

  @media (hover: hover) {
    button:hover {
      background-color: #944700;
    }
  }
`;
