import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SuccessInfoWrapper } from '../styles/StyledForm';

const SuccessInfo = ({ children }) => {
  return (
    <SuccessInfoWrapper>
      <span>
        <FontAwesomeIcon icon={faCheckCircle} />
      </span>
      {children}
    </SuccessInfoWrapper>
  );
};

export default SuccessInfo;
