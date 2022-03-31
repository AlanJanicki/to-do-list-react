import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearCheckedTasks,
  setCheckedTask,
  setTasksAmount,
  setTasksFilteredAmount,
  setTasksList,
  setTasksListErrors,
  setTasksListPage,
  setTasksPerPage,
} from '../../redux/tasksListSlice.js';
import { setIsUserTokenExpired } from '../../redux/authSlice.js';

import { saveAs } from 'file-saver';

import Papa from 'papaparse';

import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

import { faCheckDouble, faFileExport, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASKS_ORDER } from '../../graphql/mutations/tasksList.js';
import { GET_TASKS } from '../../graphql/queries/tasksList.js';

import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity.js';

import {
  CheckTasks,
  ExportTasks,
  LoadingSpinner,
  ManageTasks,
  TaskError,
  TasksListWrapper,
} from './styles/StyledTasksList.js';

import Task from '../Task/Task';
import Pagination from '../Pagination/Pagination.jsx';

const TasksList = () => {
  const [isOrderUpdatingActive, setIsOrderUpdatingActive] = useState(false);

  const accountMenuHeight = useSelector((state) => state.layout.accountMenuHeight);
  const controlPanelHeight = useSelector((state) => state.layout.controlPanelHeight);
  const checkedTasks = useSelector((state) => state.tasksList.checkedTasks);
  const displayFilter = useSelector((state) => state.tasksList.displayFilter);
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const searchedTask = useSelector((state) => state.tasksList.searchedTask);
  const tasksList = useSelector((state) => state.tasksList.tasksList);
  const tasksListErrors = useSelector((state) => state.tasksList.errors);
  const tasksListPage = useSelector((state) => state.tasksList.tasksListPage);
  const tasksPerPage = useSelector((state) => state.tasksList.tasksPerPage);
  const tasksSortType = useSelector((state) => state.tasksList.sortType);

  const dispatch = useDispatch();

  const {
    data,
    refetch,
    loading: loadingTasks,
  } = useQuery(GET_TASKS, {
    fetchPolicy: 'cache-and-network',
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].message));
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].extensions.errors));
      }
    },
    variables: {
      input: {
        displayFilter,
        searchedTask,
        tasksListPage,
        tasksPerPage,
        tasksSortType,
      },
    },
    onCompleted() {
      if (isOrderUpdatingActive) {
        setIsOrderUpdatingActive(false);
      }
    },
  });

  const [updateTasksOrder] = useMutation(UPDATE_TASKS_ORDER, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].message));
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].extensions.errors));
      }
    },
    update() {
      if (tasksListPage > 1) {
        dispatch(setTasksListPage(1));
      } else {
        refetch();
      }
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(setTasksAmount(data.getTasks.tasksAmount));
      dispatch(setTasksFilteredAmount(data.getTasks.tasksFilteredAmount));
      dispatch(setTasksList(data.getTasks.tasks));

      if (tasksListPage > Math.ceil(data.getTasks.tasksFilteredAmount / tasksPerPage)) {
        dispatch(
          setTasksListPage(Math.max(1, Math.ceil(data.getTasks.tasksFilteredAmount / tasksPerPage)))
        );
      }

      if (tasksPerPage > 20) {
        dispatch(setTasksPerPage(data.getTasks.tasksAmount));
      }
    }
  }, [data, dispatch, tasksListPage, tasksPerPage]);

  const handleDragEnd = (result) => {
    if (!result.destination || result.destination.index === result.source.index) {
      return;
    }

    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }

    const reorderedTasks = [...tasksList];
    const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedTask);

    let reorderedTasksFiltered = [];
    reorderedTasks.forEach((reorderedTask) => {
      const { __typename, ...rest } = reorderedTask;
      reorderedTasksFiltered.push(rest);
    });

    dispatch(setTasksList(reorderedTasksFiltered));

    if (tasksListPage > 1) {
      setIsOrderUpdatingActive(true);
    }

    updateTasksOrder({
      variables: {
        input: reorderedTasksFiltered,
      },
    });
  };

  const handleErrorInformation = () => {
    if (isModalOpen) {
      return;
    } else {
      if (tasksListErrors.uncategorizedErrors) {
        for (const error in tasksListErrors.uncategorizedErrors) {
          if (tasksListErrors.uncategorizedErrors[error].length > 0) {
            return (
              <>
                <TaskError>
                  <p>W trakcie operacji wystąpiły następujące błędy:</p>
                  {<p>{tasksListErrors.uncategorizedErrors}</p>}
                </TaskError>
              </>
            );
          }
        }
      }

      if (tasksListErrors.tasks) {
        for (const error in tasksListErrors.tasks) {
          if (tasksListErrors.tasks[error].length > 0) {
            return (
              <>
                <TaskError>
                  <p>W trakcie operacji na liście zadań wystąpiły następujące błędy:</p>
                  {<p>{tasksListErrors.tasks}</p>}
                </TaskError>
              </>
            );
          }
        }
      }
    }
  };

  const handleCheckAllTasksOnPage = (action) => {
    if (action === 'check') {
      const checkedTasksIds = checkedTasks.map((task) => task.id);
      const tasksIds = tasksList.map((task) => task.id);
      tasksIds.forEach((taskId) => {
        if (checkedTasksIds.some((checkedTaskId) => checkedTaskId === taskId)) {
          return;
        } else {
          dispatch(setCheckedTask(taskId));
        }
      });
    } else if (action === 'unCheck') {
      dispatch(clearCheckedTasks());
    }
  };

  const handleExportTasksToCSV = () => {
    let checkedTasksFiltered = [];
    checkedTasks.forEach((checkedTask) => {
      const { __typename, createdAt, done, id, ...rest } = checkedTask;
      checkedTasksFiltered.push(rest);
    });
    const tasksInCSV = Papa.unparse(checkedTasksFiltered);

    const blob = new Blob([tasksInCSV]);

    saveAs(blob, 'lista_zadan.csv');
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='tasks'>
          {(provided) => (
            <TasksListWrapper
              accountMenuHeight={accountMenuHeight}
              controlPanelHeight={controlPanelHeight}
              headerHeight={headerHeight}
              isAccountMenuOpen={isAccountMenuOpen}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {(isOrderUpdatingActive && tasksListPage > 1) ||
              (!tasksList && loadingTasks) ||
              (tasksList.length === 0 && loadingTasks) ? (
                <LoadingSpinner>
                  <span></span>
                </LoadingSpinner>
              ) : null}
              {handleErrorInformation()}
              {!tasksList || tasksList.length === 0 || (isOrderUpdatingActive && tasksListPage > 1)
                ? null
                : tasksList.map(({ body, createdAt, done, finishDate, id, priority }, index) => {
                    return (
                      <Draggable
                        draggableId={id}
                        index={index}
                        isDragDisabled={
                          isModalOpen || isLogoutTimeoutModalOpen || tasksSortType !== 'own'
                        }
                        key={id}>
                        {(provided) => (
                          <Task
                            body={body}
                            createdAt={createdAt}
                            done={done}
                            finishDate={finishDate}
                            id={id}
                            priority={priority}
                            tasksList={tasksList}
                            innerRef={provided.innerRef}
                            provided={provided}
                            handleErrorInformation={handleErrorInformation}></Task>
                        )}
                      </Draggable>
                    );
                  })}
              {!loadingTasks &&
                !tasksListErrors &&
                !isOrderUpdatingActive &&
                tasksList.length === 0 && <p>Twoja lista zadań jest pusta!</p>}
              {provided.placeholder}
            </TasksListWrapper>
          )}
        </Droppable>
      </DragDropContext>
      {tasksList.length > 0 && !isOrderUpdatingActive && (
        <ManageTasks>
          {tasksList.length > 1 && checkedTasks.length < tasksList.length && (
            <CheckTasks
              disabled={isModalOpen || isLogoutTimeoutModalOpen}
              title={'Zaznacz wszystkie zadania na stronie'}
              checkedTasks={checkedTasks}
              tasksList={tasksList}
              onClick={() => handleCheckAllTasksOnPage('check')}>
              <FontAwesomeIcon icon={faCheckDouble} />
            </CheckTasks>
          )}

          {tasksList.length > 1 && checkedTasks.length === tasksList.length && (
            <>
              <CheckTasks
                disabled={isModalOpen || isLogoutTimeoutModalOpen}
                checkedTasks={checkedTasks}
                tasksList={tasksList}
                title={'Odznacz wszystkie zadania na stronie'}
                onClick={() => handleCheckAllTasksOnPage('unCheck')}>
                <FontAwesomeIcon icon={faTimes} />
              </CheckTasks>
            </>
          )}

          <ExportTasks
            disabled={isModalOpen || isLogoutTimeoutModalOpen || checkedTasks.length === 0}
            title={'Wyeskportuj zadania do pliku CSV'}
            checkedTasks={checkedTasks}
            onClick={handleExportTasksToCSV}>
            <FontAwesomeIcon icon={faFileExport} />
          </ExportTasks>
        </ManageTasks>
      )}

      <Pagination isOrderUpdatingActive={isOrderUpdatingActive} />
    </>
  );
};

export default TasksList;
