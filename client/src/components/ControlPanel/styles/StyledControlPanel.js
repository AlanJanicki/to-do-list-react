import styled from 'styled-components';

import avatars from '../../../assets/img/avatars.png';

export const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: ${(props) => `${props.headerHeight}px`};
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1400px;
  background-color: #f7f7f7;
`;

export const ControlPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 90%;
  padding-bottom: 10px;

  @media (min-width: 375px) {
    width: 88%;
  }
`;

export const Welcome = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  h2 {
    margin-right: 10px;
    letter-spacing: 1px;

    @media (min-width: 768px) {
      margin-right: 20px;
      font-size: 1.4rem;
    }

    @media (min-width: 1400px) {
      font-size: 1.5rem;
    }
  }

  span {
    display: block;
    width: 48px;
    height: 54px;
    background-image: url(${avatars});
    background-position: ${(props) => `${-(props.avatar * 48)}px 0px`};
    background-size: cover;
  }
`;

export const Controls = styled.div`
  display: flex;
  flex-grow: 3;
  justify-content: space-between;

  button {
    border: none;
    background: none;
    font-size: 1.8rem;
    outline-offset: -3px;
    cursor: pointer;

    p {
      color: #000;

      @media (min-width: 992px) {
        font-size: 1.1rem;
      }
    }

    &:nth-of-type(1) {
      color: #00b044;
    }

    &:nth-of-type(2) {
      color: ${(props) =>
        props.loadingDeleteTasks ||
        props.isModalOpen ||
        props.isLogoutTimeoutModalOpen ||
        props.checkedTasks.length === 0
          ? '#919191'
          : '#eb4b57'};
      animation: ${(props) => props.loadingDeleteTasks && 'shake 1s infinite'};
    }

    &:nth-of-type(3) {
      color: ${(props) =>
        props.isModalOpen ||
        props.isLogoutTimeoutModalOpen ||
        props.checkedTasks.length === 0 ||
        props.checkedTasks.length > 1
          ? '#919191'
          : '#43537e'};
    }

    &:nth-of-type(4) {
      color: ${(props) => (props.tasksList.length > 0 ? '#2f4858' : '#919191')};
    }

    @media (hover: hover) {
      &:hover p {
        color: #ee7300;
        text-decoration: underline;
      }

      &:nth-of-type(2):hover p {
        color: ${(props) =>
          !props.isModalOpen &&
          !props.isLogoutTimeoutModalOpen &&
          props.checkedTasks.length > 0 &&
          !props.loadingDeleteTasks
            ? '#ee7300'
            : '#919191'};
        text-decoration: ${(props) =>
          !props.isModalOpen &&
          !props.isLogoutTimeoutModalOpen &&
          props.checkedTasks.length > 0 &&
          !props.loadingDeleteTasks
            ? 'underline'
            : 'none'};
      }

      &:nth-of-type(3):hover p {
        color: ${(props) =>
          !props.isModalOpen &&
          !props.isLogoutTimeoutModalOpen &&
          props.checkedTasks.length > 0 &&
          props.checkedTasks.length < 2
            ? '#ee7300'
            : '#919191'};
        text-decoration: ${(props) =>
          !props.isModalOpen &&
          !props.isLogoutTimeoutModalOpen &&
          props.checkedTasks.length > 0 &&
          props.checkedTasks.length < 2
            ? 'underline'
            : 'none'};
      }

      &:nth-of-type(4):hover p {
        color: ${(props) => (props.tasksList.length > 0 ? '#ee7300' : '#919191')};
        text-decoration: ${(props) => (props.tasksList.length > 0 ? 'underline' : 'none')};
      }
    }

    &:focus {
      outline: 1px solid #ee7300;
    }

    &:focus:not(:focus-visible) {
      outline: 0;
    }

    &:focus-visible {
      outline: 1px solid #ee7300;
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
  }
`;

export const Manage = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  select {
    width: 80%;
    max-width: 280px;
    padding: 1px 0px;
    border: 1px dotted #4b4b4b;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
    background-color: #fff;
    text-align: center;

    &:nth-of-type(2) {
      margin-bottom: 5px;
    }

    &:focus {
      border: 1px solid #ee7300;
      outline: 0;
    }

    @media (min-width: 778px) {
      margin-right: 10px;

      &:nth-of-type(2) {
        margin-right: 0;
        margin-bottom: 0;
        max-width: 150px;
      }
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }

  @media (min-width: 778px) {
    max-width: 88%;
    flex-direction: row;
    justify-content: ${(props) => {
      if (props.showSortSelect || props.showDisplaySelect) {
        return 'center';
      } else {
        return 'space-evenly';
      }
    }};
    padding-bottom: 10px;
  }
`;

export const ManageButton = styled.button`
  margin: 10px 10px 10px 0;
  border: none;
  background: none;
  color: #5e5e5e;
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
    &:hover,
    &:hover span {
      color: #ee7300;
      text-decoration: underline;
    }
  }

  span {
    margin-left: 10px;
    display: inline-block;
    color: #4c8077;
    font-size: 0.9rem;
    transform: ${(props) => {
      if (props.sortSelectButton) {
        if (!props.runFadeOutSortSelectAnimation && props.runFadeOutSortSelectAnimation !== null) {
          return 'rotate(-180deg)';
        }
      } else {
        if (
          !props.runFadeOutDisplaySelectAnimation &&
          props.runFadeOutDisplaySelectAnimation !== null
        ) {
          return 'rotate(-180deg)';
        }
      }
    }};
    transition: transform 0.5s ease;

    @media (min-width: 768px) {
      transform: ${(props) => {
        if (props.sortSelectButton) {
          if (
            !props.runFadeOutSortSelectAnimation &&
            props.runFadeOutSortSelectAnimation !== null
          ) {
            return 'rotate(-180deg)';
          }
          return 'rotate(-90deg)';
        } else {
          if (
            !props.runFadeOutDisplaySelectAnimation &&
            props.runFadeOutDisplaySelectAnimation !== null
          ) {
            return 'rotate(-180deg)';
          }
          return 'rotate(-90deg)';
        }
      }};
    }
  }
`;

export const Sort = styled.select`
  display: ${(props) => !props.showSortSelect && 'none'};
  animation: ${(props) => (props.runFadeOutSortSelectAnimation ? 'fadeOut 0.5s' : 'fadeIn 1s')};
`;

export const Display = styled.select`
  display: ${(props) => !props.showDisplaySelect && 'none'};
  animation: ${(props) => (props.runFadeOutDisplaySelectAnimation ? 'fadeOut 0.5s' : 'fadeIn 1s')};
`;
