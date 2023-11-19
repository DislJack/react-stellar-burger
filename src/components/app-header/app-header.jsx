import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.orderButton}>
          <Link to="/" className={styles.link}><Button htmlType='button' type='secondary' size='small' style={{color: window.location.pathname === '/' ? '#F2F2F3' : '#8585ad'}} extraClass={`text text_type_main-default ${window.location.pathname === '/' ? styles.button : styles.inactive} pt-4 pb-4 pr-5`}>
            <BurgerIcon type={window.location.pathname === '/' ? 'primary' : 'secondary'} />
            Конструктор
          </Button></Link>
          <Link to="/feed" className={styles.link} ><Button htmlType='button' type='secondary' size='small' style={{color: window.location.pathname === '/feed' ? '#F2F2F3' : '#8585ad'}} extraClass={`pt-4 pb-4 pr-5 pl-5 text text_type_main-default ${window.location.pathname === '/feed' ? styles.button : styles.inactive}`}>
            <ListIcon type={window.location.pathname === '/feed' ? 'primary' : 'secondary'} />
            Лента заказов
          </Button></Link>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to='/profile' className={styles.link} ><Button htmlType='button' type='secondary' size='small' style={{color: window.location.pathname === '/profile' ? '#F2F2F3' : '#8585ad'}} extraClass={`pt-4 pb-4 pl-5 text text_type_main-default ${window.location.pathname === '/profile' ? styles.button : styles.inactive}`}>
          <ProfileIcon type={window.location.pathname === '/profile' ? 'primary' : 'secondary'} />
          Личный кабинет
        </Button></Link>
      </div>
    </header>
  );
}

export default AppHeader;