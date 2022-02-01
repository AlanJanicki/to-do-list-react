import { Navigate, PaginationWrapper, TaskAmount } from './styles/StyledPagination';

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
        <button>Poprzednia strona</button>
        <select defaultValue='1'>
          <option value='none' disabled>
            Nawiguj do strony
          </option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <button>Kolejna strona</button>
      </Navigate>
    </PaginationWrapper>
  );
};

export default Pagination;
