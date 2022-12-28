import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import React, { useEffect, useState } from 'react';
const modalRoot = document.querySelector('#modalRoot');

const Modal = ({ pictures, modalImageId, closeModal }) => {
  const [modalPicture] = useState(pictures[modalImageId].largeImageURL);
  const [pictureAlt] = useState(pictures[modalImageId].tags);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        closeModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img className="modalImg" src={modalPicture} alt={pictureAlt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  pictures: PropTypes.array.isRequired,
  modalImageId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
export default Modal;
