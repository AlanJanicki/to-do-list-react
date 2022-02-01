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
    width: 70vw;
    max-width: 100%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;

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

  button:focus {
    outline: 2px solid #ee7300;
  }

  button:nth-of-type(1) {
    background-color: #ee7300;
  }

  button:nth-of-type(2) {
    background-color: #ffa95d;
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
    outline: 1px solid #ee7300;
  }

  &[type='radio']:focus {
    outline: 1px solid #ee7300;
  }

  &[type='radio']:focus:not(:focus-visible) {
    outline: 0;
  }

  &[type='radio']:focus-visible {
    outline: 1px solid #ee7300;
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
    outline: 1px solid #ee7300;
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
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
  }
`;
