import { useDispatch, useSelector } from 'react-redux';
import { setIsUserTokenExpired } from '../../redux/authSlice';
import { setTasksListPage, setTasksPerPage } from '../../redux/tasksListSlice';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
  faInfinity,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { checkUserTokenValidity } from '../../utils/checkUserTokenValidity';

import {
  AllTasks,
  FifteenTasks,
  FirstTasksListPage,
  LastTasksListPage,
  Navigate,
  NextTasksListPage,
  PaginationWrapper,
  PrevTasksListPage,
  TasksAmount,
  TenTasks,
  TwentyTasks,
} from './styles/StyledPagination';

const Pagination = ({ isOrderUpdatingActive }) => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const tasksAmount = useSelector((state) => state.tasksList.tasksAmount);
  const tasksFilteredAmount = useSelector((state) => state.tasksList.tasksFilteredAmount);
  const tasksListErrors = useSelector((state) => state.tasksList.errors);
  const tasksListPage = useSelector((state) => state.tasksList.tasksListPage);
  const tasksPerPage = useSelector((state) => state.tasksList.tasksPerPage);

  const dispatch = useDispatch();

  let tasksListPagesNumbers = [];

  const generateTasksListPagesNumbers = () => {
    for (let i = 1; i <= Math.ceil(tasksFilteredAmount / tasksPerPage); i++) {
      tasksListPagesNumbers.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }

    return tasksListPagesNumbers;
  };

  const handleTasksListPage = (e) => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    const number = parseInt(e.target.value, 10);
    dispatch(setTasksListPage(number));
  };

  const handleTasksPerPage = (e) => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(setTasksPerPage(parseInt(e.currentTarget.value, 10)));
  };

  const handleNextTasksListPage = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(
      setTasksListPage(Math.min(Math.ceil(tasksFilteredAmount / tasksPerPage), tasksListPage + 1))
    );
  };

  const handlePrevTasksListPage = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    if (tasksListPage > Math.ceil(tasksFilteredAmount / tasksPerPage)) {
      dispatch(setTasksListPage(Math.ceil(tasksFilteredAmount / tasksPerPage) - 1));
    } else {
      dispatch(setTasksListPage(Math.max(1, tasksListPage - 1)));
    }
  };

  const handleLastTasksListPage = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(setTasksListPage(Math.ceil(tasksFilteredAmount / tasksPerPage)));
  };

  const handleFirstTasksListPage = () => {
    const isUserTokenExpired = checkUserTokenValidity();
    if (isUserTokenExpired) {
      dispatch(setIsUserTokenExpired(isUserTokenExpired));
      return;
    }
    dispatch(setTasksListPage(1));
  };

  return (
    <>
      {(tasksFilteredAmount < tasksPerPage && tasksAmount !== tasksPerPage) ||
      (isOrderUpdatingActive && tasksListPage > 1)
        ? null
        : !tasksListErrors &&
          tasksAmount > 10 && (
            <PaginationWrapper>
              <h5>Ilość zadań na stronie</h5>
              <TasksAmount tasksAmount={tasksAmount} tasksPerPage={tasksPerPage}>
                <TenTasks
                  disabled={isModalOpen || isLogoutTimeoutModalOpen}
                  value={10}
                  tasksPerPage={tasksPerPage}
                  onClick={(e) => handleTasksPerPage(e)}>
                  10
                </TenTasks>
                {tasksAmount > 15 && (
                  <FifteenTasks
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    value={15}
                    tasksPerPage={tasksPerPage}
                    onClick={(e) => handleTasksPerPage(e)}>
                    15
                  </FifteenTasks>
                )}
                {tasksAmount > 20 && (
                  <TwentyTasks
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    value={20}
                    tasksPerPage={tasksPerPage}
                    onClick={(e) => handleTasksPerPage(e)}>
                    20
                  </TwentyTasks>
                )}
                <AllTasks
                  disabled={isModalOpen || isLogoutTimeoutModalOpen}
                  title={'wszystkie'}
                  value={tasksAmount}
                  tasksAmount={tasksAmount}
                  tasksPerPage={tasksPerPage}
                  onClick={handleTasksPerPage}>
                  <FontAwesomeIcon icon={faInfinity} />
                </AllTasks>
              </TasksAmount>

              <Navigate>
                {tasksListPage > 2 && (
                  <FirstTasksListPage
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    onClick={handleFirstTasksListPage}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                  </FirstTasksListPage>
                )}

                {tasksListPage > 1 && (
                  <PrevTasksListPage
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    onClick={handlePrevTasksListPage}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </PrevTasksListPage>
                )}
                <select
                  disabled={isModalOpen || isLogoutTimeoutModalOpen}
                  value={tasksListPage}
                  onChange={(e) => handleTasksListPage(e)}>
                  {generateTasksListPagesNumbers()}
                </select>
                {tasksListPage + 1 <= Math.ceil(tasksFilteredAmount / tasksPerPage) && (
                  <NextTasksListPage
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    onClick={handleNextTasksListPage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </NextTasksListPage>
                )}
                {tasksListPage + 2 <= Math.ceil(tasksFilteredAmount / tasksPerPage) && (
                  <LastTasksListPage
                    disabled={isModalOpen || isLogoutTimeoutModalOpen}
                    onClick={handleLastTasksListPage}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                  </LastTasksListPage>
                )}
              </Navigate>
            </PaginationWrapper>
          )}
    </>
  );
};

export default Pagination;
