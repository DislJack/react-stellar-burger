import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function OrderDetails() {
  return (
    <>
      <h2 className='text text_type_digits-large'>034536</h2>
      <p className='text text_type_main-medium mt-8'>Идентификатор заказа</p>
      <div className={styles.confirmation}>
        <div className={styles.big}></div>
        <div className={styles.medium}></div>
        <div className={styles.small}></div>
        <CheckMarkIcon />
      </div>
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;