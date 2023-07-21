import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
  return (
    <div className={props.open === true ? styles.active : styles.overlay} onClick={props.handleModal}></div>
  )
}

ModalOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  handleModal: PropTypes.func
}

export default ModalOverlay;