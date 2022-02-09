import styled from 'styled-components';

import avatars from '../../../assets/img/avatars.png';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

export const Logo = styled.h1`
  color: #ee7300;
  font-size: 3rem;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

export const FormWrapper = styled.div`
  @media (min-width: 992px) {
    width: 50%;
  }
`;

export const SuccessInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ee7300;
  text-align: center;

  span {
    margin-bottom: 10px;
    color: #288600;
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
`;

export const Form = styled.form`
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  padding: 30px;
  border-radius: 5px;
  background-color: #f7f7f7;

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

  @media (min-width: 992px) {
    flex-basis: 50%;
  }
`;

export const FormInput = styled.input`
  margin: 10px 0;
  width: 70vw;
  max-width: 100%;
  padding: 15px;
  border: ${(props) => (props.errorBorder ? '1px solid red' : 'none')};
  border-radius: 5px;

  &[type='date']:valid {
    color: #000;
  }

  &:focus {
    border: 1px solid #ee7300;
    outline: 0;
  }

  @media (min-width: 768px) {
    width: 65vw;
  }

  @media (min-width: 992px) {
    max-width: 85%;
  }
`;

export const FormTextArea = styled.textarea`
  margin: 10px 0;
  width: 70vw;
  max-width: 100%;
  padding: 15px;
  border: none;
  border-radius: 5px;

  &:focus {
    border: 1px solid #ee7300;
    outline: 0;
  }

  @media (min-width: 768px) {
    width: 65vw;
  }

  @media (min-width: 992px) {
    max-width: 85%;
  }
`;

export const FormParagraph = styled.p`
  margin-top: ${(props) => props.warning && '-8px'};
  width: 65vw;
  max-width: 100%;
  padding: ${(props) => (props.warning ? '0' : '15px 0')};
  color: ${(props) => {
    if (props.error || props.warning) {
      if (props.error) {
        return 'red';
      } else {
        return '#00790D';
      }
    }
  }};
  font-size: ${(props) => (props.error || !props.warning ? '1rem' : '0.8rem')};
  text-align: center;

  @media (min-width: 992px) {
    max-width: 75%;
    font-size: ${(props) => (props.error || !props.warning ? '1.1rem' : '0.9rem')};
  }
`;

export const AvatarsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ul {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
  }

  @media (min-width: 400px) {
    max-width: 70%;
  }
`;

export const Avatar = styled.li`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 5px;

  label {
    flex-basis: 90%;
    width: 80px;
    height: 90px;
    background-image: url(${avatars});
    background-position: ${(props) => `${props.offset}px`} 0px;
    cursor: pointer;
  }

  input {
    cursor: pointer;
  }
`;

export const Priorities = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  ul {
    margin-top: 10px;
    flex-basis: 100%;
    display: flex;
    list-style: none;
  }
`;

export const Priority = styled.li`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  padding: 5px 0;

  label {
    color: ${(props) => {
      if (props.amount === 1) {
        return '#FFA08A';
      } else if (props.amount === 2) {
        return '#FF8652';
      } else if (props.amount === 3) {
        return '#ee7300';
      }
    }};
  }
`;

export const ClearTasksListFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  max-width: 480px;

  p {
    margin: 0 auto 15px auto;
    color: red;
    line-height: 1.3;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }

  button {
    width: 40vw;
    max-width: 250px;
    padding: 15px;

    @media (min-width: 992px) {
      max-width: 230px;
    }
  }
`;

export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
