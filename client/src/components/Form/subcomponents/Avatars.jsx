import React from 'react';

import { useSelector } from 'react-redux';

import { Avatar, AvatarsWrapper, FormParagraph } from '../styles/StyledForm';

const Avatars = React.forwardRef(({ avatarValue, handleUserInput }, ref) => {
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const user = useSelector((state) => state.auth.user);

  let isDarkModeActive = user ? user.enabledDarkMode : false;

  const avatars = [];

  const generateAvatars = () => {
    const offsetValue = 80;
    let offset = 0;

    for (let i = 0; i < 8; i++) {
      avatars.push(
        <Avatar isDarkModeActive={isDarkModeActive} key={i} offset={offset}>
          <label htmlFor={i}></label>
          {i === 0 ? (
            <input
              disabled={isLogoutTimeoutModalOpen}
              id={i}
              name='avatar'
              type='radio'
              required
              value={avatarValue}
              ref={ref}
              onChange={(e) => handleUserInput(e)}
            />
          ) : (
            <input
              disabled={isLogoutTimeoutModalOpen}
              id={i}
              name='avatar'
              type='radio'
              required
              value={avatarValue}
              onChange={(e) => handleUserInput(e)}
            />
          )}
        </Avatar>
      );
      offset -= offsetValue;
    }
    return avatars;
  };

  return (
    <AvatarsWrapper>
      <FormParagraph isDarkModeActive={isDarkModeActive}>Wybierz swój avatar</FormParagraph>
      <ul>{generateAvatars()}</ul>
    </AvatarsWrapper>
  );
});

export default Avatars;
