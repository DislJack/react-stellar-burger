import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
const modalRoot = document.getElementById('react-modals');


function Modal({children, onClose}) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const pressESC = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC);
    }
  }, [dispatch]);

  return ReactDOM.createPortal(
    (
      <>
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.close}><CloseIcon onClick={onClose} /></div>
            {children}
          </div>
        </div>
        <ModalOverlay handleModal={onClose}></ModalOverlay>
      </>
    ), modalRoot)
}

Modal.propTypes = {
  children: PropTypes.element.isRequired
}

export default Modal;