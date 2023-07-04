import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const {children, handleModal, modalWindow, setModalWindow} = props;

  const pressESC = (evt) => {
    if (evt.key === "Escape") {
      setModalWindow({
        ...modalWindow,
        open: false
      })
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC);
    }
  }, [])

  return ReactDOM.createPortal(
    (
      <ModalOverlay open={modalWindow.open} handleModal={handleModal}>
        <div className={styles.modal} aria-modal={modalWindow.open}>
          <div className={styles.close}><CloseIcon onClick={handleModal} /></div>
          {children}
        </div>
      </ModalOverlay>
    ), modalRoot)
}

Modal.propTypes = {
  modalWindow: PropTypes.shape({
    open: PropTypes.bool.isRequired
  }),
  setModalWindow: PropTypes.func.isRequired,
  handleModal: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Modal;