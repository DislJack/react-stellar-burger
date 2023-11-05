import styles from './profile.module.css';
import { useHistory} from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState } from 'react';
import { updateUserData } from '../../services/actions/user-data';

import AppHeader from "../../components/app-header/app-header";
import Container from "../../components/container/container";
import ProfileNavigation from '../../components/profile-nav/profile-nav';
import { useDispatch, useSelector } from 'react-redux';


function ProfilePage() {
  const history = useHistory();
  const user = useSelector(store => store.user.user);
  const [userName, setUserName] = useState({
    name: user.name,
    boolean: false
  });
  const [login, setLogin] = useState({
    name: user.email,
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
      boolean: !userName.boolean
    });
    setTimeout(() => userNameRef.current.focus(), 0);
  }
  const onIconClickLogin = () => {
    setLogin({
      ...login,
      boolean: !login.boolean
    });
    setTimeout(() => loginRef.current.focus(), 0);
  }
  const onIconClickPassword = () => {
    setPassword({
      ...password,
      boolean: !password.boolean
    })
    setTimeout(() => passwordRef.current.focus(), 0);
  }

  // эффект сохранения после потери фокуса
  const onBlurUserName = () => {
    dispatch(updateUserData(userName.name, login.name, password.name, history));
    setUserName({
      ...userName,
      boolean: false
    });
    
  }
  const onBlurLogin = () => {
    setLogin({
      ...login,
      boolean: false
    });
    dispatch(updateUserData(userName.name, login.name, password.name, history));
  }
  const onBlurPassword = () => {
    setPassword({
      ...password,
      boolean: false
    });
    dispatch(updateUserData(userName.name, login.name, password.name, history));
  }

  return (
    <>
      <Container>
        <AppHeader />
        <div className={styles.container}>
          <ProfileNavigation />
          <div className={styles.properties}>
            <Input value={userName.name} onChange={onChangeUserName} placeholder='Имя' icon='EditIcon' size='default' type='text' disabled={userName.boolean ? false : true} onIconClick={onIconClickUserName} ref={userNameRef} onBlur={onBlurUserName} />
            <Input value={login.name} onChange={onChangeLogin} placeholder='Логин' icon='EditIcon' size='default' type='text' disabled={login.boolean ? false : true} onIconClick={onIconClickLogin} ref={loginRef} onBlur={onBlurLogin} />
            <Input value={password.name} onChange={onChangePassword} placeholder='Пароль' icon='EditIcon' size='default' type={password.boolean === true ? 'text' : 'password'} disabled={password.boolean ? false : true} onIconClick={onIconClickPassword} ref={passwordRef} onBlur={onBlurPassword} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProfilePage;