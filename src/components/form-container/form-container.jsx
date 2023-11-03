import styles from "./form-container.module.css";

function FormContainer({children}) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default FormContainer;