import React from 'react';
import styles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Ingredient(props) {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <article className={styles.ingredient} onClick={handleClick}>
      <Counter count={count} />
      <img src={props.image} alt={props.name} />
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{props.price}</p>
        <CurrencyIcon />
      </div>
      <h3 className='text text_type_main-default'>{props.name}</h3>
    </article>
  )
}

export default Ingredient;