import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  margin: 0 auto 20px auto;
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

export const TasksAmount = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;
  column-gap: 5px;
  width: 100%;

  button {
    padding: 3px;
  }
`;

export const TenTasks = styled.button`
  color: ${(props) => (props.tasksPerPage === 10 ? '#4c8077' : '#919191')};
`;

export const FifteenTasks = styled.button`
  color: ${(props) => (props.tasksPerPage === 15 ? '#4c8077' : '#919191')};
`;

export const TwentyTasks = styled.button`
  color: ${(props) => (props.tasksPerPage === 20 ? '#4c8077' : '#919191')};
`;

export const AllTasks = styled.button`
  color: ${(props) => (props.tasksPerPage > 20 ? '#4c8077' : '#919191')};
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

  select {
    width: 50px;
    height: 30px;
    border: none;
    background-color: #fff;
    border: 1px dotted #4b4b4b;
    border-radius: 5px;
    color: #000;
    text-align: center;
    cursor: pointer;

    &:focus {
      border: 1px solid #ee7300;
      outline: 0;
    }
  }
`;

export const PrevTasksListPage = styled.button`
  color: #ee7300;

  @media (hover: hover) {
    div &:hover {
      color: #944700;
    }
  }
`;

export const NextTasksListPage = styled.button`
  color: #ee7300;

  @media (hover: hover) {
    div &:hover {
      color: #944700;
    }
  }
`;

export const FirstTasksListPage = styled.button`
  color: #4c8077;

  @media (hover: hover) {
    div &:hover {
      color: #ee7300;
    }
  }
`;

export const LastTasksListPage = styled.button`
  color: #4c8077;

  @media (hover: hover) {
    div &:hover {
      color: #ee7300;
    }
  }
`;
