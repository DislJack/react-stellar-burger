import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalRoot = document.getElementById('react-modals');


function Modal({children, handleModal, modalWindow, setModalWindow}) {

  const pressESC = useCallback((evt) => {
    if (evt.key === "Escape") {
      setModalWindow({
        ...modalWindow,
        open: false
      })
    }
  }, [modalWindow, setModalWindow]);

  React.useEffect(() => {
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC);
    }
  }, [pressESC])

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.container}>
          <div className={styles.modal} aria-modal={modalWindow.open}>
            <div className={styles.close}><CloseIcon onClick={handleModal} /></div>
            {children}
          </div>
        </div>
        <ModalOverlay open={modalWindow.open} handleModal={handleModal}></ModalOverlay>
      </>
    ), modalRoot)
}

Modal.propTypes = {
  children: PropTypes.element.isRequired
}

export default Modal;