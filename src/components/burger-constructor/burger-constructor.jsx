import styles from './burger-constrictor.module.css';
import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({burger, getWindowHeight, handleModal}) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleModal(evt);
  }

  const totalPrice = React.useMemo(() => {
    const bun = burger.bun.price ? burger.bun.price*2 : 0;
    return burger.ingredients.reduce((all, item) => {
      return all + item.price;
    }, bun);
  }, [burger.bun, burger.ingredients]);

  return (
    <form className={styles.grid} onSubmit={handleSubmit}>
      <div className={styles.ingredients}>
        {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (верх)'} price={burger.bun.price} thumbnail={burger.bun.image} type='top' key={burger.bun._id + 'top'} extraClass='pr-8 mr-4' isLocked={true} />}
        <ul className='custom-scroll' style={{display: 'flex', padding: '0 6px 0 0', listStyleType: 'none', margin: 0, flexDirection: 'column', gap: '16px', overflowY: 'scroll', maxHeight: getWindowHeight(), boxSizing: 'border-box'}}>
          {burger.ingredients.map((ingredient, index) => {
            console.log(ingredient._id + index);
            return <li className={styles.drag}><DragIcon /><ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} key={ingredient._id + index} /></li>
          })}
        </ul>
        {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (низ)'} price={burger.bun.price} thumbnail={burger.bun.image} type='bottom' key={burger.bun._id + 'bottom'} extraClass='pr-8 mr-4' isLocked={true} />}
      </div>
      {burger.bun._id === undefined && burger.ingredients.length === 0 ? '' : <div className={styles.final}>
        <p className='text text_type_digits-medium' style={{display: 'flex', alignItems: 'center', gap: 8}}>{totalPrice}<CurrencyIcon /></p>
        <Button htmlType='submit' size='large' type='primary'>Оформить заказ</Button>
      </div>}
    </form>
  )
}

BurgerConstructor.propTypes = {
  burger: PropTypes.object.isRequired,
  getWindowHeight: PropTypes.func,
  handleModal: PropTypes.func
}

export default BurgerConstructor;