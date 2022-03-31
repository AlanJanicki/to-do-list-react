import styled from 'styled-components';

export const TaskWrapper = styled.li`
  margin-bottom: 15px;
  flex-basis: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  row-gap: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #dfe0df;
  color: ${(props) => props.isDarkModeActive && '#e2e2e2'};

  input[type='checkbox'] {
    filter: ${(props) => props.isDarkModeActive && 'grayscale(1)'};

    &:focus {
      filter: unset;
      outline: 1px solid #ee7300;
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    &:focus-visible {
      filter: unset;
      outline: 1px solid #ee7300;
    }

    @media (hover: hover) {
      cursor: pointer;
    }

    @media (min-width: 576px) {
      margin: 0 10px 0 0;
    }

    @media (min-width: 992px) {
      margin: 0 20px 0 0;
    }

    @media print {
      display: none;
    }
  }

  h3 {
    max-width: 100%;
    word-wrap: break-word;
    color: ${(props) => props.done && '#919191'};
    text-align: center;
    text-decoration: ${(props) => props.done && 'line-through'};
    text-decoration-thickness: 1px;
    transition: color 0.3s ease;
    white-space: pre-wrap;

    @media (min-width: 576px) {
      margin-right: auto;
    }

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }
  }

  span {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    row-gap: 10px;

    h4,
    h5 {
      color: ${(props) => props.done && '#919191'};
      font-size: 0.9rem;
      font-weight: 400;
      text-decoration: ${(props) => props.done && 'line-through'};
      text-decoration-thickness: 1px;
      transition: color 0.3s ease;

      @media (min-width: 992px) {
        font-size: 1rem;
      }
    }

    h4 {
      text-decoration: ${(props) => (props.done ? 'underline line-through' : 'underline')};
    }

    @media (min-width: 576px) {
      margin-left: 10px;
      flex-direction: row;
      column-gap: 10px;
    }

    @media (min-width: 992px) {
      column-gap: 20px;
    }
  }

  @media (min-width: 576px) {
    flex-direction: row;
  }

  @media (min-width: 992px) {
    margin-bottom: 25px;
    padding-bottom: 25px;
    row-gap: 15px;
  }
`;

export const TaskDoneButton = styled.button`
  border: none;
  color: ${(props) => (props.done ? '#00b044' : '#919191')};
  background: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  cursor: pointer;
  animation: ${(props) => props.loadingToggleTaskDone && 'shake 1s infinite'};

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
      color: ${(props) => (props.done ? '#919191' : '#00b044')};
    }
  }

  @media (min-width: 576px) {
    margin-right: 10px;
  }

  @media (min-width: 992px) {
    margin-right: 20px;
  }

  @media print {
    display: none;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;

export const TaskDate = styled.h4`
  margin-bottom: 20px;
  font-size: 1.1rem;

  @media (min-width: 576px) {
    flex-basis: 100%;
    text-align: center;
  }

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }

  @media (min-width: 992px) {
    font-size: 1.8rem;
  }
`;

export const PriorityStarsList = styled.ul`
  display: flex;
  align-items: center;
  column-gap: 5px;
  color: ${(props) => {
    if (props.done) {
      return 'rgba(0,0,0,0.2)';
    } else {
      if (props.amount === 1 && !props.done) {
        return '#FFA08A';
      } else if (props.amount === 2 && !props.done) {
        return '#FF8652';
      } else if (props.amount === 3 && !props.done) {
        return '#ee7300';
      }
    }
  }};
  list-style: none;
  transition: color 0.3s ease;

  li:first-child {
    margin-right: 15px;
    padding: 2px;
    border: ${(props) =>
      props.tasksSortType === 'own' ? '1px solid #4c8077' : '1px solid #919191'};
    border-radius: 5px;
    color: ${(props) => (props.tasksSortType === 'own' ? '#4c8077' : '#919191')};
    font-size: 0.9rem;
    cursor: pointer;

    &:focus {
      border: 2px solid #ee7300;
      outline: 0;
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    &:focus-visible {
      border: 2px solid #ee7300;
      outline: 0;
    }

    &:active {
      border: ${(props) => props.tasksSortType === 'own' && '3px solid #4c8077'};
    }

    @media (hover: hover) {
      &:hover {
        border: ${(props) => props.tasksSortType === 'own' && '3px solid #4c8077'};
      }
    }

    @media print {
      display: none;
    }
  }
`;
