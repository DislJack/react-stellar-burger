import styles from './ingredient-constructor.css';
import React from 'react';
import { DragIcon, LockIcon, DeleteIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function IngredientConstructor(props) {

  const createBorder = () => {
    switch (props.ariaDetails) {
      case 'bunTop':
        return {borderRadius: '88px 88px 40px 40px'};
      case 'bunBottom':
        return {borderRadius: '40px 40px 88px 88px'};
      default:
        return {borderRadius: 40};
    }
  }
  // Ошибка в консоли на ariaDetails пишет что неопределён.
  return (
    <div aria-details={props.ariaDetails} key={props._id}>
      {props.ariaDetails === 'default' ? <DragIcon type='primary' /> : ''}
      <article styles={createBorder}>
        <img src={props.image} alt={props.name} />
        <h3>{props.name}</h3>
        <div>
          <p>{props.price}</p>
          <CurrencyIcon />
        </div>
        {this.ariaDetails === 'default' ? <DeleteIcon type='primary' /> : <LockIcon type='secondary' />}
      </article>
    </div>
  )
}

export default IngredientConstructor;