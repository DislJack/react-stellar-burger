import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ingredient, burger, selectIngredient, handleModal}) {

  const count = React.useMemo(() => {
    const {bun, ingredients} = burger;
    if (ingredient.type === 'bun') {
      return ingredient._id === bun._id ? 1 : 0;
    }
    return ingredients.filter((item) => item._id === ingredient._id).length;
  }, [ingredient._id, burger, ingredient.type]);

  const handleClick = () => {
    selectIngredient(ingredient._id);
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
  ingredient: PropTypes.object.isRequired,
  burger: PropTypes.object.isRequired,
  selectIngredient: PropTypes.func,
  handleModal: PropTypes.func
}

export default Ingredient;