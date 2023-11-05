import OrderCard from '../order-card/order-card';
import styles from './orders-feed.module.css';

function OrdersFeed() {
  return (
    <div className={styles.container + ' custom-scroll'}>
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </div>
  )
}

export default OrdersFeed;