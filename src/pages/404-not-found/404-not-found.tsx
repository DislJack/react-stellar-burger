import styles from './404-not-found.module.css';
import image from '../../images/error.svg';
import {Link, useLocation} from 'react-router-dom';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

type TLocationState = {
  errorNumber: string;
  hash: string;
  pathname: string;
  search: string;
  state: {
    errorNumber: string;
  }
}

function NotFoundPage() {
  const location = useLocation<TLocationState>();
  const errorText: string = location.state === undefined ? '404' : location.state.errorNumber;
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large text_color_inactive">Хьюстон, у нас проблемы. Мы всё сломали.</h2>
      <div className={styles.image_error_container}>
        <img className={styles.image} src={image} alt='error' />
        <p className={styles.error}>{errorText}</p>
      </div>
      <p className="text text_type_main-medium text_color_inactive">Чтобы продолжить работу с приложением, нажмите на кнопку: <Link to="/" ><Button htmlType="button" type='primary' size='large'>Починить!</Button></Link></p>
    </div>
  )
}

export default NotFoundPage;