import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient({ingredient, selectIngredient}) {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    // Если клик по булке, то счётчик должен сбрасывать все счётчики у булок и назначать новый счётчик той булке, которая не была выбрана изначально. А если булка имела счётчик 1 и на неё кликнули, то ничего не менять. Хз как это сделать пока что.
    selectIngredient(ingredient._id);
    ingredient.type === 'bun' ? setCount(1) : setCount(count + 1);
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

export default Ingredient;