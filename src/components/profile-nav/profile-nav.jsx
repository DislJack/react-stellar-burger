import styles from './profile-nav.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../../services/actions/user-data';
import { useDispatch } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

function ProfileNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();


  const logoutUserClick = () => {
    dispatch(logoutUser(history));
  }

  return (
    <nav className={styles.nav}>
      <Link to='/profile' className={styles.link} ><Button type='secondary' htmlType='button' extraClass={`text text_type_main-medium pt-4 pb-4 ${window.location.pathname === '/profile' ? styles.white : 'text_color_inactive'}`}>Профиль</Button></Link>
      <Link to='/profile/orders' className={styles.link} ><Button type='secondary' htmlType='button' extraClass={`text text_type_main-medium pt-4 pb-4 ${window.location.pathname === '/profile/orders' ? styles.white : 'text_color_inactive'}`} >История заказов</Button></Link>
      <Button type='secondary' htmlType='button' extraClass='text text_type_main-medium pt-4 pb-4 text_color_inactive' style={{textAlign: 'start'}} onClick={logoutUserClick}>Выйти</Button>
      <p className='text text_type_main-small text_color_inactive mt-20' style={{maxWidth: 320}}>{window.location.pathname === '/profile' ? 'В этом разделе вы можете изменить свои персональные данные' : 'В этом разделе вы можете просмотреть свою историю заказов'}</p>
    </nav>
  )
}

export default ProfileNavigation;