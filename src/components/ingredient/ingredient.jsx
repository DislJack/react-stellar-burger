import React from 'react';
import {ingredientPropType} from '../../utils/prop-types.js';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from "react-redux";
import { openModalWithIngredient } from '../../services/actions/modal-ingredient.js';
import { useDrag } from 'react-dnd';
import { selectBurger } from '../../services/selectors.js';

function Ingredient({ingredient}) {
  const burger = useSelector(selectBurger);
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  const count = React.useMemo(() => {
    if (ingredient.type === 'bun') {
      return ingredient._id === burger.bun._id ? 1 : 0;
    }
    return burger.ingredients.filter((item) => item._id === ingredient._id).length;
  }, [ingredient._id, burger.bun, burger.ingredients, ingredient.type]);

  /* const handleClick = () => {
    dispatch(openModalWithIngredient(ingredient));
  } */

  return (
    <>
      <article ref={dragRef} className={styles.ingredient} /* onClick={handleClick} */>
        {count === 0 ? '' : <Counter count={count} />}
        <img src={ingredient.image} alt={ingredient.name} />
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{ingredient.price}</p>
          <CurrencyIcon />
        </div>
        <h3 className='text text_type_main-default'>{ingredient.name}</h3>
      </article>
    </>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired
}

export default Ingredient;