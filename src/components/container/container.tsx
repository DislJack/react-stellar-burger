import styles from './container.module.css';
import {FunctionComponent} from 'react';

const Container: FunctionComponent = ({children}) => {
  return (<div className={styles.container}>
    {children}
  </div>
  )
}

export default Container;