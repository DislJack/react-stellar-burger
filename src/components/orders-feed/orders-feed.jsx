import OrderCard from '../order-card/order-card';
import styles from './orders-feed.module.css';
import {Link, useLocation} from 'react-router-dom';

function OrdersFeed({orders, path}) {
  const location = useLocation();
  return (
    <div className={styles.container + ' custom-scroll'}>
      {orders && orders.map(order => {
        return (order.ingredients.length !== 0 && <Link className={styles.link} to={{ pathname: path === '/feed' ? `/feed/${order.number}` : `/profile/orders/${order.number}`, state: {background: location}}} key={order.number}><OrderCard order={order} /></Link>)
      })}
    </div>
  )
}

export default OrdersFeed;