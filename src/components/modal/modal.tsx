import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from '../../services/hooks';

type TModal = {
  onClose: () => void;
}


const Modal: FunctionComponent<TModal> = ({children, onClose}) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const pressESC = (evt: {key: string}) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC);
    }
  }, [dispatch]);

  return (
      <>
        <div className={styles.container}>
          <div className={styles.modal}>
            <div className={styles.close}><CloseIcon type='primary' onClick={onClose} /></div>
            {children}
          </div>
        </div>
        <ModalOverlay handleModal={onClose}></ModalOverlay>
      </>
    )
}

export default Modal;