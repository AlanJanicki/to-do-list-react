import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import Compress from 'compress.js';

import { Form, FormParagraph, UploadAvatar } from '../styles/StyledForm';
import { LoadingSpinner } from '../styles/StyledForm';

import Avatars from './Avatars';
import SuccessInfo from './SuccessInfo';

const AvatarsForm = React.forwardRef(
  (
    {
      avatarValue,
      formErrors,
      formSentSuccessfully,
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
      const resizedImage = await compress.compress([e.target.files[0]], {
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

            <UploadAvatar isDarkModeActive={isDarkModeActive}>
              <label
                disabled={isLogoutTimeoutModalOpen || loading}
                htmlFor='ownAvatar'
                tabIndex={isLogoutTimeoutModalOpen || loading ? '-1' : '0'}
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
            </UploadAvatar>
            {ownAvatarValue && (
              <FormParagraph isDarkModeActive={isDarkModeActive}>
                Avatar załadowany, zatwierdź aby zmienić
              </FormParagraph>
            )}
            <button disabled={isLogoutTimeoutModalOpen || loading} type='submit'>
              {!ownAvatarValue ? 'Wybierz' : 'Zatwierdź'} {loading && <LoadingSpinner />}
            </button>
          </Form>
        )}
      </>
    );
  }
);

export default AvatarsForm;
