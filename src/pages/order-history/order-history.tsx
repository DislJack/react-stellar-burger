import ProfileNavigation from '../../components/profile-nav/profile-nav';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import styles from './order-history.module.css';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { connect, disconnect } from '../../services/actions/feed';
import { useDispatch, useSelector } from '../../services/hooks';

/* export const ORDER_HISTORY_WS = `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')}`; */

function PersonalOrders() {
  const data = useSelector(store => store.orderHistory.data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const ORDER_HISTORY_WS = `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')}`;
    dispatch(connect(ORDER_HISTORY_WS));
    return () => {
      dispatch(disconnect())
    }
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <ProfileNavigation />
        <OrdersFeed orders={data === undefined ? undefined : data.orders} path={location.pathname} />
      </div>
    </div>
  )
}

export default PersonalOrders;