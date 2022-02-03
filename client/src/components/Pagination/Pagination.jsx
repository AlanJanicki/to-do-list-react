import { Navigate, PaginationWrapper, TaskAmount } from './styles/StyledPagination';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = () => {
  return (
    <PaginationWrapper>
      <h5>Ilość zadań na stronie</h5>
      <TaskAmount>
        <button>5</button>
        <button>10</button>
        <button>15</button>
        <button>20</button>
      </TaskAmount>
      <Navigate>
        <button>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
        <button>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <form>
          <input type='number' placeholder='1' />
        </form>
        <button>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </Navigate>
    </PaginationWrapper>
  );
};

export default Pagination;
