import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modalRoot = document.getElementById('react-modals');


function Modal({children, onClose, open, setModalWindow}) {

  React.useEffect(() => {
    const pressESC = (evt) => {
      if (evt.key === "Escape") {
        setModalWindow({open: false});
      }
    };
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC);
    }
  }, [setModalWindow])

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.container}>
          <div className={styles.modal} aria-modal={open}>
            <div className={styles.close}><CloseIcon onClick={onClose} /></div>
            {children}
          </div>
        </div>
        <ModalOverlay open={open} handleModal={onClose}></ModalOverlay>
      </>
    ), modalRoot)
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  setModalWindow: PropTypes.func.isRequired
}

export default Modal;