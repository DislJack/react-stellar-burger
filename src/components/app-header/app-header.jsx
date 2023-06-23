import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header>
      <Button htmlType='button' type='primary' size='medium'>
        <BurgerIcon type='primary' />
        <p>Конструктор</p>
      </Button>
      <Button htmlType='button' type='primary' size='medium'>
        <ListIcon type='secondary' />
        <p>Лента заказов</p>
      </Button>
      <Logo />
      <Button htmlType='button' type='primary' size='medium'>
        <ProfileIcon type='secondary' />
        <p>Личный кабинет</p>
      </Button>
    </header>
  );
}

export default AppHeader;