import styles from './404-not-found.module.css';
import image from '../../images/404page.svg';
import {Link} from 'react-router-dom';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large text_color_inactive">Хьюстон, у нас проблемы. Мы всё сломали.</h2>
      <img className={styles.image} src={image} alt='404 page' />
      <p className="text text_type_main-medium text_color_inactive">Чтобы продолжить работу с приложением, нажмите на кнопку: <Link to="/" ><Button htmlType="button" type='primary' size='large'>Починить!</Button></Link></p>
    </div>
  )
}

export default NotFoundPage;