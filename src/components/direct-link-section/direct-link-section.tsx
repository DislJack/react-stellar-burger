import styles from './direct-link-section.module.css';
import {FunctionComponent, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const DirectLinkSection: FunctionComponent = ({children}) => {
  const history = useHistory();

  const closeWindow = (): void => {
    history.go(-1);
  }

  useEffect(() => {
    const pressESC = (evt: {key: string}): void => {
      if (evt.key === "Escape") {
        closeWindow();
      }
    };
    document.addEventListener('keydown', pressESC);
    return () => {
      document.removeEventListener('keydown', pressESC)
    }
  }, [])
  return (
    <section className={styles.section} onClick={closeWindow}>
      {children}
    </section>
  )
}

export default DirectLinkSection;