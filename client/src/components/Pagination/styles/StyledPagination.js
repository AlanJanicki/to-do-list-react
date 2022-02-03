import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;

  h5 {
    color: #5e5e5e;
    font-size: 0.9rem;
    font-weight: normal;

    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }

  button {
    border: none;
    color: #4c8077;
    background: none;
    font-size: 0.9rem;
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

    @media (hover: hover) {
      &:hover {
        color: #ee7300;
        text-decoration: underline;
      }
    }

    @media (min-width: 1024px) {
      font-size: 1rem;
    }
  }
`;

export const TaskAmount = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  column-gap: 5px;
  width: 100%;

  button {
    padding: 3px;
  }
`;

export const Navigate = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  column-gap: 10px;
  align-items: center;
  width: 100%;

  button {
    padding: 5px;
    text-align: center;
  }

  button:nth-of-type(2),
  button:nth-of-type(3) {
    color: #ee7300;

    @media (hover: hover) {
      &:hover {
        color: #944700;
      }
    }
  }

  input {
    width: 50px;
    height: 30px;
    border: none;
    text-align: center;
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
  }
`;
