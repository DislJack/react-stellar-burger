import styles from './ingredient-constructor.css';
import React from 'react';
import { DragIcon, LockIcon, DeleteIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientConstructor(props) {
  const ingredientStyle = {
    display: 'flex',
    backgroundColor: '#1C1C21',
    gap: '20px',
    padding: '16px 32px 16px 24px',
    justifyContent: 'flex-end'
  }

  const createStyle = () => {
    switch (props.ariaDetails) {
      case 'bunTop':
        ingredientStyle.borderRadius = '88px 88px 40px 40px';
        return ingredientStyle;
      case 'bunBottom':
        ingredientStyle.borderRadius = '40px 40px 88px 88px';
        return ingredientStyle;
      default:
        ingredientStyle.borderRadius = '40px';
        return ingredientStyle;
    }
  }
  return (
    <div className={styles.container} aria-details={props.ariaDetails} key={props._id}>
      {props.ariaDetails === 'default' ? <DragIcon type='primary' /> : ''}
      <article style={createStyle()}>
        <img className={styles.image} src={props.image} alt={props.name} />
        <h3 className='text text_type_main-default'>{props.name}</h3>
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{props.price}</p>
          <CurrencyIcon />
        </div>
        {props.ariaDetails === 'default' ? <DeleteIcon type='primary' /> : <LockIcon type='secondary' />}
      </article>
    </div>
  )
}

export default IngredientConstructor;