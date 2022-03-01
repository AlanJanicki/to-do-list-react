import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setIsUserTokenExpired } from '../../redux/authSlice';
import { setControlPanelHeight } from '../../redux/layoutSlice';
import {
  removeCheckedTask,
  setDisplayFilter,
  setSortType,
  setTasksListErrors,
} from '../../redux/tasksListSlice';

import { useMutation } from '@apollo/client';
import { DELETE_TASKS } from '../../graphql/mutations/tasksList';
import { GET_TASKS } from '../../graphql/queries/tasksList';

import {
  faAngleDoubleDown,
  faEdit,
  faMinusCircle,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useWindowWidth from '../../hooks/useWindowWidth';

import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';

import {
  Controls,
  ControlPanelWrapper,
  Display,
  Manage,
  ManageButton,
  Sort,
  Welcome,
  Wrapper,
} from './styles/StyledControlPanel';

import Form from '../Form/Form';

const ControlPanel = () => {
  const [runFadeOutDisplaySelectAnimation, setRunFadeOutDisplaySelectAnimation] = useState(null);
  const [runFadeOutSortSelectAnimation, setRunFadeOutSortSelectAnimation] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [showDisplaySelect, setShowDisplaySelect] = useState(false);
  const [showSortSelect, setShowSortSelect] = useState(false);

  const checkedTasks = useSelector((state) => state.tasksList.checkedTasks);
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const tasksDisplayFilter = useSelector((state) => state.tasksList.displayFilter);
  const tasksList = useSelector((state) => state.tasksList.tasksList);
  const tasksSortType = useSelector((state) => state.tasksList.sortType);
  const user = useSelector((state) => state.auth.user);

  const controlPanel = useRef(null);

  const dispatch = useDispatch();

  const windowWidth = useWindowWidth();

  const [deleteTasks, { loading: loadingDeleteTasks }] = useMutation(DELETE_TASKS, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].message));
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].extensions.errors));
      }
    },
    refetchQueries: [GET_TASKS, 'Query'],
  });

  useLayoutEffect(() => {
    dispatch(setControlPanelHeight(controlPanel.current.getBoundingClientRect().height));
  }, [dispatch, showDisplaySelect, showSortSelect, tasksList, windowWidth, user.ownAvatar]);

  const handleUncheckFilteredTasks = useCallback(() => {
    const checkedTasksIds = checkedTasks.map((task) => task.id);
    const tasksIds = tasksList.map((task) => task.id);
    checkedTasksIds.forEach((checkedTaskId) => {
      if (tasksIds.some((taskId) => taskId === checkedTaskId)) {
        return;
      } else {
        dispatch(removeCheckedTask(checkedTaskId));
      }
    });
  }, [checkedTasks, dispatch, tasksList]);

  useEffect(() => {
    handleUncheckFilteredTasks();
  }, [handleUncheckFilteredTasks]);

  const handleSelectOption = (e) => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    setSelectedOption(e.currentTarget.getAttribute('data-option'));
  };

  const handleUnselectOption = () => {
    setTimeout(() => {
      setSelectedOption(null);
    }, 500);
  };

  const handleToggleShowSortSelect = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    if (!showSortSelect) {
      setShowSortSelect(true);
      setRunFadeOutSortSelectAnimation(false);
    } else {
      setRunFadeOutSortSelectAnimation(true);
      setTimeout(() => {
        setShowSortSelect(false);
      }, 200);
    }
  };

  const handleToggleShowDisplaySelect = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    if (!showDisplaySelect) {
      setShowDisplaySelect(true);
      setRunFadeOutDisplaySelectAnimation(false);
    } else {
      setRunFadeOutDisplaySelectAnimation(true);
      setTimeout(() => {
        setShowDisplaySelect(false);
      }, 200);
    }
  };

  const handleDeleteTasks = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    const checkedTasksIds = checkedTasks.map((task) => task.id);
    deleteTasks({
      variables: {
        input: checkedTasksIds,
      },
    });
  };

  const handleSortType = (e) => {
    dispatch(setSortType(e.target.value));
  };

  const handleDisplayFilter = (e) => {
    dispatch(setDisplayFilter(e.target.value));
  };

  return (
    <>
      <Wrapper
        isDarkModeActive={isDarkModeActive}
        headerHeight={headerHeight}
        ref={controlPanel}
        showSortSelect={showSortSelect}>
        <ControlPanelWrapper>
          <Welcome
            avatar={user.avatar}
            isDarkModeActive={isDarkModeActive}
            ownAvatar={user.ownAvatar}>
            <h2>Witaj, {user.name}</h2>
            <span></span>
          </Welcome>
          <Controls
            checkedTasks={checkedTasks}
            isDarkModeActive={isDarkModeActive}
            isModalOpen={isModalOpen}
            isLogoutTimeoutModalOpen={isLogoutTimeoutModalOpen}
            loadingDeleteTasks={loadingDeleteTasks}
            tasksList={tasksList}>
            <button
              data-option='addTask'
              disabled={isModalOpen || isLogoutTimeoutModalOpen}
              title={'Dodaj zadanie'}
              onClick={handleSelectOption}>
              <FontAwesomeIcon icon={faPlusCircle} />
              {windowWidth > 660 && <p>Dodaj zadanie</p>}
            </button>
            <button
              data-option='removeTask'
              disabled={
                isModalOpen ||
                isLogoutTimeoutModalOpen ||
                checkedTasks.length === 0 ||
                loadingDeleteTasks
              }
              title={
                'Usuń zadani' +
                (checkedTasks.length > 1 && !isModalOpen && !isLogoutTimeoutModalOpen ? 'a' : 'e')
              }
              onClick={handleDeleteTasks}>
              <FontAwesomeIcon icon={faMinusCircle} />
              {windowWidth > 660 && (
                <p>
                  Usuń zadani
                  {checkedTasks.length > 1 && !isModalOpen && !isLogoutTimeoutModalOpen ? 'a' : 'e'}
                </p>
              )}
            </button>
            <button
              data-option='editTask'
              disabled={
                isModalOpen ||
                isLogoutTimeoutModalOpen ||
                checkedTasks.length === 0 ||
                checkedTasks.length > 1
              }
              title={
                checkedTasks.length > 1 && !isModalOpen && !isLogoutTimeoutModalOpen
                  ? 'Edytuj zadanie (max 1 naraz)'
                  : 'Edytuj zadanie'
              }
              onClick={handleSelectOption}>
              <FontAwesomeIcon icon={faEdit} />
              {windowWidth > 660 && <p>Edytuj zadanie</p>}
            </button>
            <button
              data-option='confirmFormTasksList'
              disabled={isModalOpen || isLogoutTimeoutModalOpen || tasksList.length === 0}
              title={'Wyczyść listę'}
              onClick={handleSelectOption}>
              <FontAwesomeIcon icon={faTrashAlt} />
              {windowWidth > 660 && <p>Wyczyść listę</p>}
            </button>
          </Controls>
        </ControlPanelWrapper>

        <Manage
          isDarkModeActive={isDarkModeActive}
          showDisplaySelect={showDisplaySelect}
          showSortSelect={showSortSelect}>
          <ManageButton
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            isDarkModeActive={isDarkModeActive}
            runFadeOutSortSelectAnimation={runFadeOutSortSelectAnimation}
            sortSelectButton={true}
            onClick={handleToggleShowSortSelect}>
            Sortuj zadania według:
            <span>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </span>
          </ManageButton>
          <Sort
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            name='sort'
            value={tasksSortType}
            onChange={(e) => handleSortType(e)}
            runFadeOutSortSelectAnimation={runFadeOutSortSelectAnimation}
            showSortSelect={showSortSelect}>
            <option value='own'>Własna kolejność</option>
            <option value='oldestAdd'>Daty dodania (od najstarszych)</option>
            <option value='newestAdd'>Daty dodania (od najnowszych)</option>
            <option value='earliestFinish'>Daty zakończenia (od brak/najwcześniejszych)</option>
            <option value='latestFinish'>Daty zakończenia (od najpóźniejszych)</option>
            <option value='A-Z'>Alfabetycznie (A-Z)</option>
            <option value='Z-A'>Alfabetycznie (Z-A)</option>
            <option value='highestPriority'>Priorytetu (od najważniejszego)</option>
            <option value='lowestPriority'>Priorytetu (od najmniej ważnego)</option>
          </Sort>
          <ManageButton
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            displaySelectButton={true}
            isDarkModeActive={isDarkModeActive}
            runFadeOutDisplaySelectAnimation={runFadeOutDisplaySelectAnimation}
            onClick={handleToggleShowDisplaySelect}>
            Wyświetlaj:
            <span>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </span>
          </ManageButton>
          <Display
            disabled={isModalOpen || isLogoutTimeoutModalOpen}
            name='display'
            value={tasksDisplayFilter}
            onChange={(e) => handleDisplayFilter(e)}
            runFadeOutDisplaySelectAnimation={runFadeOutDisplaySelectAnimation}
            showDisplaySelect={showDisplaySelect}>
            <option value='all'>Wszystkie</option>
            <option value='done'>Zrobione</option>
            <option value='undone'>Niezrobione</option>
          </Display>
        </Manage>
      </Wrapper>
      {selectedOption === 'addTask' && (
        <Form isModalOpenOnInit={true} addTaskForm={true} disableForm={handleUnselectOption} />
      )}
      {selectedOption === 'editTask' && (
        <Form
          editTaskData={checkedTasks}
          isModalOpenOnInit={true}
          editTaskForm={true}
          disableForm={handleUnselectOption}
        />
      )}
      {selectedOption === 'confirmFormTasksList' && (
        <Form
          isModalOpenOnInit={true}
          confirmFormTasksList={true}
          disableForm={handleUnselectOption}
        />
      )}
    </>
  );
};

export default ControlPanel;
