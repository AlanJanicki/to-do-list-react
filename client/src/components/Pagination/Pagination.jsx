import { useSelector } from 'react-redux';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Navigate, PaginationWrapper, TaskAmount } from './styles/StyledPagination';

const Pagination = () => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  return (
    <PaginationWrapper>
      <h5>Ilość zadań na stronie</h5>
      <TaskAmount>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>5</button>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>10</button>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>15</button>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>20</button>
      </TaskAmount>
      <Navigate>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <form>
          <input disabled={isModalOpen || isLogoutTimeoutModalOpen} type='number' placeholder='1' />
        </form>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button disabled={isModalOpen || isLogoutTimeoutModalOpen}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </Navigate>
    </PaginationWrapper>
  );
};

export default Pagination;
