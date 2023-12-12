import styles from './burger-constrictor.module.css';
import React from 'react';
import { CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import DraggableElement from '../draggableElement/draggable-element';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import createOrder from '../../services/actions/final-order';
import {addIngredient, updateIngredientsList} from '../../services/actions/burger-constructor';
import { useDrop } from 'react-dnd';
import { closeAndCLearModal } from '../../services/actions/modal-ingredient';
import { selectBurger, selectModal, selectOrderNumber } from '../../services/selectors';
import {useHistory} from 'react-router-dom';
import Preloader from '../preloader/preloader';

function BurgerConstructor() {
  const burger = useSelector(selectBurger);
  const {open, ingredient} = useSelector(selectModal);
  const number = useSelector(selectOrderNumber);
  const isLoading = useSelector(store => store.order.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    }
  });

  const getWindowHeight = () => {
    return window.innerHeight - 520;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (localStorage.getItem('accessToken')) {
      dispatch(createOrder(burger));
    } else {
      history.push('/login')
    }
    
  }

  const closeModal = () => {
    dispatch(closeAndCLearModal());
  }

  const totalPrice = React.useMemo(() => {
    const bun = burger.bun.price ? burger.bun.price*2 : 0;
    return burger.ingredients.reduce((all, item) => {
      return all + item.price;
    }, bun);
  }, [burger.bun, burger.ingredients]);

  const moveIngredient = (dragIndex, hoverIndex) => {
    burger.ingredients.splice(hoverIndex, 0, burger.ingredients.splice(dragIndex, 1)[0]);
    dispatch(updateIngredientsList());
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails number={number} />
    </Modal>
  )

  return (
    <>
      {isLoading === true && <Preloader />}
      {open && ingredient === 'submit' && modal}
      <form className={styles.grid} ref={dropTarget} onSubmit={handleSubmit}>
        <div className={styles.ingredients}>
          {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (верх)'} price={burger.bun.price} thumbnail={burger.bun.image} type='top' key={burger.bun.key + 'top'} extraClass='pr-8 mr-4' isLocked={true} />}
          <ul className='custom-scroll' style={{display: 'flex', padding: '0 6px 0 0', listStyleType: 'none', margin: 0, flexDirection: 'column', gap: '16px', overflowY: 'scroll', maxHeight: getWindowHeight(), boxSizing: 'border-box'}}>
            {burger.ingredients.map((ingredient, index) => <DraggableElement ingredient={ingredient} key={ingredient.key} index={index} moveIngredient={moveIngredient} />)}
          </ul>
          {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (низ)'} price={burger.bun.price} thumbnail={burger.bun.image} type='bottom' key={burger.bun.key + 'bottom'} extraClass='pr-8 mr-4' isLocked={true} />}
        </div>
        {burger.bun._id === undefined && burger.ingredients.length === 0 ? '' : <div className={styles.final}>
          <p className='text text_type_digits-medium' style={{display: 'flex', alignItems: 'center', gap: 8}}>{totalPrice}<CurrencyIcon /></p>
          <Button htmlType='submit' size='large' type='primary'>Оформить заказ</Button>
        </div>}
      </form>
    </>
  )
}

export default BurgerConstructor;