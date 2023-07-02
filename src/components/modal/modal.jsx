import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
const modalRoot = document.getElementById('react-modals');

function Modal(props) {
  const {open, children, handleModal} = props;

  return ReactDOM.createPortal(
    (
      <div className={open === true ? styles.active : styles.overlay} onClick={handleModal}>
        <div className={styles.modal} aria-modal={open}>
          <div className={styles.close}><CloseIcon onClick={handleModal} /></div>
          {children}
        </div>
      </div>
    ), modalRoot)
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func
}

export default Modal;