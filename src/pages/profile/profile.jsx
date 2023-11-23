import styles from './profile.module.css';
import { useHistory} from 'react-router-dom';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserData } from '../../services/actions/user-data';

import ProfileNavigation from '../../components/profile-nav/profile-nav';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks/useInput';


function ProfilePage() {
  const history = useHistory();
  const user = useSelector(store => store.user.user);
  const userName = useInput(user.name);
  const login = useInput(user.email);
  const password = useInput('');
  const dispatch = useDispatch();

  const onBlur = (input) => {
    input.setValue({
      ...input.value,
      boolean: false
    });
    dispatch(updateUserData(userName.value.name, login.value.name, password.value.name, history));
  }

  return (
    <>
      <div className={styles.container}>
        <ProfileNavigation />
        <div className={styles.properties}>
          <Input value={userName.value.name} onChange={userName.onChange} placeholder='Имя' icon='EditIcon' size='default' type='text' disabled={userName.value.boolean ? false : true} onIconClick={userName.onIconClick} ref={userName.valueRef} onBlur={() => onBlur(userName)} />
          <Input value={login.value.name} onChange={login.onChange} placeholder='Логин' icon='EditIcon' size='default' type='text' disabled={login.value.boolean ? false : true} onIconClick={login.onIconClick} ref={login.valueRef} onBlur={() => onBlur(login)} />
          <Input value={password.value.name} onChange={password.onChange} placeholder='Пароль' icon='EditIcon' size='default' type={password.value.boolean === true ? 'text' : 'password'} disabled={password.value.boolean ? false : true} onIconClick={password.onIconClick} ref={password.valueRef} onBlur={() => onBlur(password)} />
        </div>
      </div>
    </>
  )
}

export default ProfilePage;