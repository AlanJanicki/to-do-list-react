import styled from 'styled-components';

export const TasksListWrapper = styled.ul`
  margin-top: ${(props) =>
    props.isAccountMenuOpen
      ? `${props.headerHeight + props.controlPanelHeight + props.accountMenuHeight}px`
      : `${props.headerHeight + props.controlPanelHeight}px`};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 15px;
  transition: margin-top 0.5s ease;

  p {
    margin-bottom: 20px;
    color: #00b044;
    flex-basis: 100%;
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;

    @media (min-width: 768px) {
      margin-bottom: 30px;
      font-size: 1.4rem;
    }

    @media (min-width: 992px) {
      font-size: 1.8rem;
    }
  }

  @media (min-width: 992px) {
    padding-top: 25px;
  }

  @media print {
    margin-top: 0;
  }
`;

export const TaskError = styled.div`
  p {
    flex-basis: 100%;
    margin-bottom: 15px;
    color: red;
    font-size: 1rem;
    font-weight: normal;
    text-align: center;

    @media (min-width: 992px) {
      font-size: 1.1rem;
    }
  }
`;

export const LoadingSpinner = styled.div`
  margin-bottom: 15px;
  flex-basis: 100%;
  display: flex;
  justify-content: center;

  span {
    display: block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #ee7300;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ManageTasks = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto 15px auto;

  button {
    padding: 5px 15px;
    background: none;
    border: none;
    font-size: 1.2rem;
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

  @media print {
    display: none;
  }
`;

export const CheckTasks = styled.button`
  color: ${(props) => (props.tasksList.length === props.checkedTasks.length ? 'red' : '#919191')};

  @media (hover: hover) {
    &:hover {
      color: ${(props) =>
        props.tasksList.length === props.checkedTasks.length ? 'red' : '#00b044'};
    }
  }
`;

export const ExportTasks = styled.button`
  color: ${(props) => (props.checkedTasks.length > 0 ? '#00b044' : '#919191')};

  @media (hover: hover) {
    &:hover {
      color: ${(props) => (props.checkedTasks.length > 0 ? '#00b044' : '#919191')};
    }
  }
`;
