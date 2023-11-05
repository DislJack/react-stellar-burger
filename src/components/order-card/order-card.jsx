import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';

function OrderCard() {
  return (
    <div className={styles.card}>
      <div className={styles.data}>
        <h3 className='text text_type_digits-default'>232324</h3>
        <p className='text text_type_main-small text_color_inactive'>sdcdssd</p>
      </div>
      <p className='text text_type_main-medium'>Ddsdsd</p>
      <div className={styles.box}>
        <div className={styles.ingredients}>
          <div className={styles.image} ></div>
          <div className={styles.image} ></div>
          <div className={styles.image} ></div>
        </div>
        <div className={styles.price}>
          <p className='text text_type_digits-default'>232</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  )
}

export default OrderCard;