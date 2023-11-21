import AppHeader from '../../components/app-header/app-header';
import Container from '../../components/container/container';
import ProfileNavigation from '../../components/profile-nav/profile-nav';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import styles from './order-history.module.css';
import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import { connectHistory, disconnectHistory } from '../../services/actions/order-history';

export const ORDER_HISTORY_WS = `wss://norma.nomoreparties.space/orders?token=${localStorage.getItem('accessToken')}`;

function PersonalOrders() {
  const data = useSelector(store => store.orderHistory.data);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(connectHistory(ORDER_HISTORY_WS));
    return () => {
      dispatch(disconnectHistory())
    }
  }, [])

  return (
    <Container>
      <AppHeader />
      <div className={styles.section}>
        <div className={styles.container}>
          <ProfileNavigation />
          <OrdersFeed orders={data.orders} path={location.pathname} />
        </div>
      </div>
    </Container>
  )
}

export default PersonalOrders;