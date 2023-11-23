import styles from "./feed.module.css";
import OrdersFeed from "../../components/orders-feed/orders-feed";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/feed";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from 'react-router-dom';

export const FEED_PAGE_WS = 'wss://norma.nomoreparties.space/orders/all';

function FeedPage() {
  const dispatch = useDispatch();
  const data = useSelector(store => store.socket.data);
  const location = useLocation();

  useEffect(() => {
    dispatch(connect(FEED_PAGE_WS));
    return () => {
      dispatch(disconnect());
    }
  }, [])

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h2>
      <div className={styles.container}>
        <OrdersFeed orders={data.orders} path={location.pathname} />
        <div className={styles.boards}>
          <div className={styles.orders}>
            <div>
              <p className='text text_type_main-medium pb-6'>Готовы:</p>
              <div className={styles.board}>
                {data.orders && data.orders.filter(order => order.status === 'done').map(order => {
                    return <p className={"text text_type_digits-default " + styles.finished} key={order.number}>{order.number}</p>
                  })}
              </div>
            </div>
            <div>
              <p className='text text_type_main-medium pb-6'>В работе:</p>
              <div className={styles.board}>
                {data.orders && data.orders.filter(order => order.status !== 'done').map(order => {
                  return <p className={"text text_type_digits-default"} key={order.number}>{order.number}</p>
                })}
              </div>
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={"text text_type_digits-large " + styles.shadow}>{data.total}</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={"text text_type_digits-large " + styles.shadow}>{data.totalToday}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedPage;