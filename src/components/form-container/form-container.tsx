import styles from "./form-container.module.css";
import {FunctionComponent} from 'react';

const FormContainer: FunctionComponent = ({children}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default FormContainer;