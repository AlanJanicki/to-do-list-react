import { useDispatch, useSelector } from 'react-redux';
import { setIsUserTokenExpired } from '../../redux/authSlice';
import { removeCheckedTask, setCheckedTask, setTasksListErrors } from '../../redux/tasksListSlice';

import { useMutation } from '@apollo/client';
import { TOGGLE_TASK_DONE } from '../../graphql/mutations/tasksList';
import { GET_TASKS } from '../../graphql/queries/tasksList';

import { faArrowsAlt, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';

import { PriorityStarsList, TaskDate, TaskDoneButton, TaskWrapper } from './styles/StyledTask';

const Task = ({
  body,
  createdAt,
  done,
  finishDate,
  handleErrorInformation,
  id,
  priority,
  tasksList,
  innerRef,
  provided,
}) => {
  const checkedTasks = useSelector((state) => state.tasksList.checkedTasks);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const tasksSortType = useSelector((state) => state.tasksList.sortType);

  const dispatch = useDispatch();

  const [toggleTaskDone, { loading: loadingToggleTaskDone }] = useMutation(TOGGLE_TASK_DONE, {
    onError(err) {
      console.log(err);
      if (err.graphQLErrors[0] && err.graphQLErrors[0].message) {
        dispatch(setTasksListErrors(err.graphQLErrors[0].message));
        handleErrorInformation();
      } else if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions.errors) {
        dispatch(setTasksListErrors([err.graphQLErrors[0].extensions.errors]));
        handleErrorInformation();
      }
    },
    refetchQueries: [GET_TASKS, 'Query'],
  });

  const convertDate = (taskDate, options) => {
    const date = new Date(taskDate);
    if (options === 'trimDate') {
      return date.toLocaleString([], {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    return date.toLocaleString([], {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const generatePriorityStars = (amount) => {
    let stars = [];

    for (let i = 0; i < amount; i++) {
      stars.push(
        <li key={i}>
          <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
        </li>
      );
    }
    return stars;
  };

  const handleShowTaskCreatedDate = (id) => {
    const taskIndex = tasksList.findIndex((task) => task.id === id);

    for (let i = taskIndex; i >= 0; i--) {
      if (taskIndex === 0) {
        return true;
      } else {
        if (
          tasksList[taskIndex].createdAt.substring(0, 10) !==
          tasksList[taskIndex - 1].createdAt.substring(0, 10)
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const handleCheckedInput = (id) => {
    return checkedTasks.some((task) => task.id === id);
  };

  const handleTaskDone = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
    } else {
      toggleTaskDone({
        variables: {
          done: !done,
          taskId: id,
        },
      });
    }
  };

  const handleUserInput = (e) => {
    if (e.target.checked) {
      dispatch(setCheckedTask(e.target.id));
    } else {
      dispatch(removeCheckedTask(e.target.id));
    }
  };

  return (
    <TaskWrapper
      done={done}
      loadingToggleTaskDone={loadingToggleTaskDone}
      ref={innerRef}
      {...provided.draggableProps}>
      {handleShowTaskCreatedDate(id) && <TaskDate>{convertDate(createdAt, 'trimDate')}</TaskDate>}
      <input
        checked={handleCheckedInput(id)}
        disabled={isModalOpen || isLogoutTimeoutModalOpen}
        id={id}
        type='checkbox'
        onChange={(e) => handleUserInput(e)}
      />
      <TaskDoneButton
        disabled={isModalOpen || isLogoutTimeoutModalOpen || loadingToggleTaskDone}
        done={done}
        loadingToggleTaskDone={loadingToggleTaskDone}
        id={id}
        title={'Oznacz jako zrobione'}
        onClick={handleTaskDone}>
        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
      </TaskDoneButton>
      <h3>{body}</h3>
      <span>
        <PriorityStarsList amount={parseInt(priority, 10)} tasksSortType={tasksSortType}>
          <li {...provided.dragHandleProps}>
            <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
          </li>
          {priority && generatePriorityStars(parseInt(priority, 10))}
        </PriorityStarsList>

        <h4>
          Data dodania:
          {' ' + convertDate(createdAt)}
        </h4>
        {finishDate && <h5>Planowana data zakończenia: {' ' + convertDate(finishDate)}</h5>}
      </span>
    </TaskWrapper>
  );
};

export default Task;
