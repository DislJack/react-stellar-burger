import styles from './profile.module.css';
import {Link, Redirect} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { UPDATE_USER_DATA_SUCCESS, updateUserData } from '../../services/actions/user-data';

import AppHeader from "../../components/app-header/app-header";
import Container from "../../components/container/container";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserRequest } from '../../utils/burger-api';
import { AUTH_LOGOUT, AUTH_SUCCESS } from '../../services/actions/auth';


function ProfilePage() {
  const user = useSelector(store => store.user.user);
  const passwordSave = useSelector(store => store.auth.password);
  const isUserLoaded = useSelector(store => store.auth.isUserLoaded);
  const [userName, setUserName] = useState({
    name: '',
    boolean: false
  });
  const [login, setLogin] = useState({
    name: '',
    boolean: false
  });
  const [password, setPassword] = useState({
    name: '',
    boolean: false
  });
  const dispatch = useDispatch();


  const userNameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);


  if (localStorage.getItem('accessTokem')) {
    dispatch({type: AUTH_SUCCESS});
  }

  // Сохранение данных при изменении
  const onChangeUserName = (e) => {
    setUserName({
      ...userName,
      name: e.target.value
    });
  }
  const onChangeLogin = (e) => {
    setLogin({
      ...login,
      name: e.target.value
    });
  }
  const onChangePassword = (e) => {
    setPassword({
      ...password,
      name: e.target.value
    });
  }

  // Клик на иконку
  const onIconClickUserName = () => {
    setUserName({
      ...userName,
      boolean: true
    });
    setTimeout(() => userNameRef.current.focus(), 0);
  }
  const onIconClickLogin = () => {
    setLogin({
      ...login,
      boolean: true
    });
    setTimeout(() => loginRef.current.focus(), 0);
  }
  const onIconClickPassword = () => {
    setPassword({
      ...password,
      boolean: true
    })
    setTimeout(() => passwordRef.current.focus(), 0);
  }

  // эффект сохранения после потери фокуса
  const onBlurUserName = () => {
    setUserName({
      ...userName,
      boolean: false
    });
    dispatch(updateUserData(userName, login, password));
  }
  const onBlurLogin = () => {
    setLogin({
      ...login,
      boolean: false
    });
    dispatch(updateUserData(userName, login, password));
  }
  const onBlurPassword = () => {
    setPassword({
      ...password,
      boolean: false
    });
    dispatch(updateUserData(userName, login, password));
  }

  const logoutUserClick = () => {
    logoutUserRequest().then(() => {
      localStorage.clear();
      dispatch({type: UPDATE_USER_DATA_SUCCESS, user: {}});
      dispatch({type: AUTH_LOGOUT});
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      {isUserLoaded === false && <Redirect to='/login' />}
      <Container>
        <AppHeader />
        <div className={styles.container}>
          <nav className={styles.nav}>
            <Link to='/' style={{textDecoration: 'none'}}><Button type='secondary' htmlType='button' style={{color: '#F2F2F3'}} extraClass='text text_type_main-medium pt-4 pb-4'>Профиль</Button></Link>
            <Link to='/' style={{textDecoration: 'none'}}><Button type='secondary' htmlType='button' extraClass='text text_type_main-medium pt-4 pb-4 text_color_inactive'>История заказов</Button></Link>
            <Button type='secondary' htmlType='button' extraClass='text text_type_main-medium pt-4 pb-4 text_color_inactive' style={{textAlign: 'start'}} onClick={logoutUserClick}>Выйти</Button>
            <p className='text text_type_main-small text_color_inactive mt-20' style={{maxWidth: 320}}>В этом разделе вы можете изменить свои персональные данные</p>
          </nav>
          <div className={styles.properties}>
            <Input value={user.name} onChange={onChangeUserName} placeholder='Имя' icon='EditIcon' size='default' type='text' disabled={userName.boolean === true ? false : true} onIconClick={onIconClickUserName} ref={userNameRef} onBlur={onBlurUserName} />
            <Input value={user.email} onChange={onChangeLogin} placeholder='Логин' icon='EditIcon' size='default' type='text' disabled={login.boolean === true ? false : true} onIconClick={onIconClickLogin} ref={loginRef} onBlur={onBlurLogin} />
            <Input value={passwordSave} onChange={onChangePassword} placeholder='Пароль' icon='EditIcon' size='default' type={password.boolean === true ? 'text' : 'password'} disabled={password.boolean === true ? false : true} onIconClick={onIconClickPassword} ref={passwordRef} onBlur={onBlurPassword} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProfilePage;