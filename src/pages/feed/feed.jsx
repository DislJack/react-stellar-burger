import styles from "./feed.module.css";
import Container from "../../components/container/container";
import AppHeader from "../../components/app-header/app-header";
import OrdersFeed from "../../components/orders-feed/orders-feed";

function FeedPage() {
  return (
    <Container >
      <AppHeader />
      <section className={styles.section}>
        <h2 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h2>
        <div className={styles.container}>
          <OrdersFeed />
          <div className={styles.boards}>
            <div className={styles.orders}>
              <div>
                <p className='text text_type_main-medium pb-6'>Готовы:</p>
                <div className={styles.board}>
                  <p className={"text text_type_digits-default " + styles.finished}>234242</p>
                </div>
              </div>
              <div>
                <p className='text text_type_main-medium pb-6'>В работе:</p>
                <div className={styles.board}>
                  <p className={"text text_type_digits-default"}>234242</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за всё время:</p>
              <p className={"text text_type_digits-large " + styles.shadow}>123252</p>
            </div>
            <div>
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <p className={"text text_type_digits-large " + styles.shadow}>123252</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default FeedPage;