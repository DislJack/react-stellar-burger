import OrderCard from '../order-card/order-card';
import styles from './orders-feed.module.css';
import {Link} from 'react-router-dom';

function OrdersFeed({orders, location}) {
  return (
    <div className={styles.container + ' custom-scroll'}>
      {orders && orders.map(order => {
        return (order.ingredients.length !== 0 && <Link className={styles.link} to={{ pathname: location === '/feed' ? `/feed/${order.number}` : `/profile/orders/${order.number}`}} key={order.number}><OrderCard order={order} /></Link>)
      })}
    </div>
  )
}

export default OrdersFeed;