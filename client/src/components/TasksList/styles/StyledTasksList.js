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

  @media (min-width: 992px) {
    padding-top: 25px;
  }
`;

export const TaskDate = styled.h3`
  margin-bottom: 20px;
  flex-basis: 100%;
  font-size: 1.1rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 30px;
    font-size: 1.4rem;
  }

  @media (min-width: 992px) {
    font-size: 1.8rem;
  }
`;

export const TaskError = styled.p`
  flex-basis: 100%;
  margin-bottom: 15px;
  color: red;
  text-align: center;

  @media (min-width: 992px) {
    font-size: 1.1rem;
  }
`;
