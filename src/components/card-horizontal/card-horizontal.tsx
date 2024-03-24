import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card-horizontal.module.css';
import { selectIngredientList } from '../../services/selectors';
import { FunctionComponent } from 'react';
import { useSelector } from '../../services/hooks';

type TIngredient = {
  ingredient: {
    _id: string;
    count: number;
  };
}

const CardHorizontal: FunctionComponent<TIngredient> = ({ingredient}) => {
  const data = useSelector(selectIngredientList);
  const currentIngredient = data.buns.concat(data.sauces, data.main).find(ing => ing._id === ingredient._id);
  return (
    <article className={styles.card}>
      <img className={styles.image} src={currentIngredient === undefined ? '' : currentIngredient.image} alt={currentIngredient === undefined ? '' : currentIngredient.name} />
      <h3 className={`text text_type_main-small ${styles.heading}`}>{currentIngredient === undefined ? '' : currentIngredient.name}</h3>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{`${data.buns.find(ing => ing._id === ingredient._id) === undefined ? ingredient.count: '2'} x ${currentIngredient === undefined ? null : currentIngredient.price}`}</p>
        <CurrencyIcon type='primary' />
      </div>
    </article>
  )
}

export default CardHorizontal;