import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  handleModal: () => void;
}

function ModalOverlay(props: TModalOverlay) {
  return (
    <div className={styles.overlay} onClick={props.handleModal}></div>
  )
}

export default ModalOverlay;