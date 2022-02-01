import { useLayoutEffect } from 'react';

import { useSelector } from 'react-redux';

import { CloseButton, ModalContent, ModalWrapper } from './styles/StyledModal';

const Modal = ({ children, handleCloseModal }) => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  useLayoutEffect(() => {
    const handleCloseModalWithKeyboard = (e) => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleCloseModalWithKeyboard);

    return () => {
      window.removeEventListener('keydown', handleCloseModalWithKeyboard);
    };
  }, [handleCloseModal]);

  return (
    <ModalWrapper isModalOpen={isModalOpen}>
      <ModalContent>
        <CloseButton>
          <button onClick={handleCloseModal}>&times;</button>
        </CloseButton>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
