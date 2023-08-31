import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.orderButton}>
          <Link to="/" style={{textDecoration: 'none'}}><Button htmlType='button' type='secondary' size='small' style={{ position: 'relative', zIndex: 1, color: '#F2F2F3', textAlign: 'center', alignItems: 'center', display: 'flex', gap: 8}} extraClass='pt-4 pb-4 pr-5 text text_type_main-default'>
            <BurgerIcon type='primary' />
            Конструктор
          </Button></Link>
          <Button htmlType='button' type='secondary' size='small' style={{ position: 'relative', zIndex: 1, textAlign: 'center', alignItems: 'center', display: 'flex', gap: 8}} extraClass='pt-4 pb-4 pr-5 pl-5 text text_type_main-default text_color_inactive'>
            <ListIcon type='secondary' />
            Лента заказов
          </Button>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to='/profile' style={{textDecoration: 'none'}} ><Button htmlType='button' type='secondary' size='small' style={{ position: 'relative', zIndex: 1, textAlign: 'center', alignItems: 'center', display: 'flex', gap: 8}} extraClass='pt-4 pb-4 pl-5 text text_type_main-default text_color_inactive'>
          <ProfileIcon type='secondary' />
          Личный кабинет
        </Button></Link>
      </div>
    </header>
  );
}

export default AppHeader;