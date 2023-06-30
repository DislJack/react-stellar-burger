import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => {
    setOpen(!open);
  }

  // Тут должна быть логика закрытия попапа через кнопку ESC.


  return ReactDOM.createPortal(
    (
      <div className={open === true ? styles.active : styles.overlay} onClick={handleCloseModal}>
        <div className={styles.modal} aria-modal={open}>
          <CloseIcon onClick={handleCloseModal} />
          {props.children}
        </div>
      </div>
    ), modalRoot)
}

export default Modal;