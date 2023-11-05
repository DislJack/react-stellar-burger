import AppHeader from '../../components/app-header/app-header';
import Container from '../../components/container/container';
import ProfileNavigation from '../../components/profile-nav/profile-nav';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import styles from './order-history.module.css';

function PersonalOrders() {
  return (
    <Container>
      <AppHeader />
      <div className={styles.section}>
        <div className={styles.container}>
          <ProfileNavigation />
          <OrdersFeed />
        </div>
      </div>
    </Container>
  )
}

export default PersonalOrders;