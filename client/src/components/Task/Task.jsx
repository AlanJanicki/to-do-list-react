import { faArrowsAlt, faCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PriorityStarsList, TaskWrapper } from './styles/StyledTask';

const Task = ({ children, innerRef, provided }) => {
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

  return (
    <TaskWrapper ref={innerRef} {...provided.draggableProps}>
      <input type='checkbox' />
      <button title={'Oznacz jako zrobione'}>
        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
      </button>
      <h3>{children}</h3>
      <span>
        <PriorityStarsList amount={3}>
          <li {...provided.dragHandleProps}>
            <FontAwesomeIcon icon={faArrowsAlt}></FontAwesomeIcon>
          </li>
          {generatePriorityStars(3)}
        </PriorityStarsList>
        <h4>Data dodania: 2022-01-20</h4>
        <h5>Planowana data zakończenia: 2022-01-31</h5>
      </span>
    </TaskWrapper>
  );
};

export default Task;
