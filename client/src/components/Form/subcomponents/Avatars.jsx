import React from 'react';

import { Avatar, AvatarsWrapper, FormParagraph } from '../styles/StyledForm';

const Avatars = React.forwardRef(({ avatarValue, handleUserInput }, ref) => {
  const avatars = [];

  const generateAvatars = () => {
    const offsetValue = 80;
    let offset = 0;

    for (let i = 1; i < 9; i++) {
      offset -= offsetValue;
      avatars.push(
        <Avatar key={i} offset={offset}>
          <label htmlFor={i}></label>
          {i === 1 ? (
            <input
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
    }
    return avatars;
  };

  return (
    <AvatarsWrapper>
      <FormParagraph>Wybierz swój avatar</FormParagraph>
      <ul>{generateAvatars()}</ul>
    </AvatarsWrapper>
  );
});

export default Avatars;
