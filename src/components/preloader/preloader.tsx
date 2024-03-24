import styles from './preloader.module.css';

function Preloader() {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <p className={`text text_type_main-default ${styles.loading}`}>Выбираем самого лучшего повара. Подождите...</p>
      </div>
    </>
  )
}

export default Preloader;