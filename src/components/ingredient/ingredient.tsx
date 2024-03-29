import React, {FunctionComponent} from 'react';
import {TIngredientPropType} from '../../utils/prop-types.js';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { selectBurger } from '../../services/selectors';
import { useSelector } from '../../services/hooks';

type TIngredient = {
  ingredient: TIngredientPropType;
}

const Ingredient: FunctionComponent<TIngredient> = ({ingredient}) => {
  const burger = useSelector(selectBurger);
  const [, dragRef] = useDrag<TIngredientPropType, unknown, unknown>({
    type: 'ingredient',
    item: ingredient
  });

  const count = React.useMemo(() => {
    if (ingredient.type === 'bun') {
      return ingredient._id === burger.bun._id ? 1 : 0;
    }
    return burger.ingredients.filter((item) => item._id === ingredient._id).length;
  }, [ingredient._id, burger.bun, burger.ingredients, ingredient.type]);

  return (
    <>
      <article ref={dragRef} className={styles.ingredient}>
        {count === 0 ? '' : <Counter count={count} />}
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{ingredient.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <h3 className='text text_type_main-default'>{ingredient.name}</h3>
      </article>
    </>
  )
}

export default Ingredient;