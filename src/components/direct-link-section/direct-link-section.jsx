import styles from './direct-link-section.module.css';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function DirectLinkSection({children}) {
  const history = useHistory();

  const closeWindow = () => {
    history.go(-1);
  }

  useEffect(() => {
    const pressESC = (evt) => {
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