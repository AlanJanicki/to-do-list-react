import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import Compress from 'compress.js';

import { Form, FormParagraph, UploadFile } from '../styles/StyledForm';
import { LoadingSpinner } from '../styles/StyledForm';

import Avatars from './Avatars';
import SuccessInfo from './SuccessInfo';

const AvatarsForm = React.forwardRef(
  (
    {
      avatarValue,
      formErrors,
      formSentSuccessfully,
      isOwnAvatarChangeInProgress,
      handleErrorInformation,
      handleSubmitForm,
      handleUserInput,
      loading,
      ownAvatarValue,
      setFormType,
    },
    ref
  ) => {
    const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    const compress = new Compress();

    useEffect(() => {
      setFormType('avatarsForm');
    }, [setFormType]);

    const handleUploadAvatarInput = async (e) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      const resizedImage = await compress.compress([file], {
        size: 2,
        quality: 1,
        maxWidth: 48,
        maxHeight: 54,
        resize: true,
      });
      const img = resizedImage[0];
      const base64str = img.data;
      const imgExt = img.ext;
      const resizedFile = Compress.convertBase64ToFile(base64str, imgExt);
      handleUserInput(resizedFile);
    };

    const handleKeyboardOperation = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.target.click();
      }
    };

    return (
      <>
        {formSentSuccessfully ? (
          <SuccessInfo>Avatar został zmieniony</SuccessInfo>
        ) : (
          <Form isDarkModeActive={isDarkModeActive} onSubmit={handleSubmitForm}>
            {handleErrorInformation()}
            {!ownAvatarValue && (
              <>
                {formErrors.avatar && (
                  <FormParagraph error={true}>{formErrors.avatar}</FormParagraph>
                )}
                <Avatars avatarValue={avatarValue} ref={ref} handleUserInput={handleUserInput} />

                {formErrors.ownAvatar && (
                  <FormParagraph error={true}>{formErrors.ownAvatar}</FormParagraph>
                )}
              </>
            )}

            {ownAvatarValue && (
              <FormParagraph isDarkModeActive={isDarkModeActive}>
                Avatar załadowany poprawnie, zatwierdź aby zmienić
              </FormParagraph>
            )}
            <button
              disabled={isLogoutTimeoutModalOpen || loading || isOwnAvatarChangeInProgress}
              type='submit'>
              {!ownAvatarValue ? 'Wybierz' : 'Zatwierdź'}{' '}
              {loading || (isOwnAvatarChangeInProgress && <LoadingSpinner />)}
            </button>
            <UploadFile isDarkModeActive={isDarkModeActive}>
              <label
                disabled={isLogoutTimeoutModalOpen || loading || isOwnAvatarChangeInProgress}
                htmlFor='ownAvatar'
                tabIndex={
                  isLogoutTimeoutModalOpen || loading || isOwnAvatarChangeInProgress ? '-1' : '0'
                }
                onKeyDown={(e) => handleKeyboardOperation(e)}>
                Wgraj swój własny avatar
                <br />
                <span>(preferowany rozmiar: 48/54px)</span>
              </label>
              <input
                accept='.jpg, .jpeg, .png'
                id='ownAvatar'
                name='ownAvatar'
                type='file'
                onChange={handleUploadAvatarInput}
              />
            </UploadFile>
          </Form>
        )}
      </>
    );
  }
);

export default AvatarsForm;
