import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
  return (
    <div className={styles.overlay} onClick={props.handleModal}></div>
  )
}

ModalOverlay.propTypes = {
  handleModal: PropTypes.func
}

export default ModalOverlay;