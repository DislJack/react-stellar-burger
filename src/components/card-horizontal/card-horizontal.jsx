import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card-horizontal.module.css';
import { useSelector } from 'react-redux';
import { selectIngredientList } from '../../services/selectors';

function CardHorizontal({ingredient}) {
  const data = useSelector(selectIngredientList);
  const currentIngredient = data.buns.concat(data.sauces, data.main).find(ing => ing._id === ingredient._id);
  return (
    <article className={styles.card}>
      <img className={styles.image} src={currentIngredient.image} alt={currentIngredient.name} />
      <h3 className={`text text_type_main-small ${styles.heading}`}>{currentIngredient.name}</h3>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{`${data.buns.find(ing => ing._id === ingredient._id) === undefined ? ingredient.count: '2'} x ${currentIngredient.price}`}</p>
        <CurrencyIcon type='primary' />
      </div>
    </article>
  )
}

export default CardHorizontal;