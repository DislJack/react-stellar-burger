import React, {useContext} from 'react';
import {ingredientPropType} from '../../utils/prop-types.js';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../services/burgerContext.jsx';
import { ModalContext } from '../../services/modalContext.jsx';

function Ingredient({ingredient}) {
  const {burger, findIngredient} = useContext(BurgerContext);
  const {handleModal} = useContext(ModalContext);

  const count = React.useMemo(() => {
    const {bun, ingredients} = burger;
    if (ingredient.type === 'bun') {
      return ingredient._id === bun._id ? 1 : 0;
    }
    return ingredients.filter((item) => item._id === ingredient._id).length;
  }, [ingredient._id, burger, ingredient.type]);

  const handleClick = () => {
    findIngredient(ingredient._id);
    handleModal(ingredient);
  }

  return (
    <article className={styles.ingredient} onClick={handleClick}>
      {count === 0 ? '' : <Counter count={count} />}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <h3 className='text text_type_main-default'>{ingredient.name}</h3>
    </article>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired
}

export default Ingredient;