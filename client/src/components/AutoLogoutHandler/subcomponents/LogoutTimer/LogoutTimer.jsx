import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LogoutTimerWrapper } from '../../styles/StyledLogoutTimer';

const LogoutTimer = ({ children, isUserAutoLoggedOut }) => {
  return (
    <LogoutTimerWrapper isUserAutoLoggedOut={isUserAutoLoggedOut}>
      <span>
        <FontAwesomeIcon icon={faClock} />
      </span>
      {children}
    </LogoutTimerWrapper>
  );
};

export default LogoutTimer;
