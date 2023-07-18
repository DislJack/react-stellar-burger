import styles from "./app.module.css";
import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getData } from "../../utils/burger-api";
import { ModalContext } from "../../services/modalContext";
import { StateContext } from "../../services/stateContext";
import { BurgerContext } from "../../services/burgerContext";


function App() {
  const initialBurger = {
    bun: {},
    ingredients: []
  }
  const [burger, dispatchBurger] = React.useReducer(reducer, initialBurger, undefined);
  const [state, setState] = React.useState({
    data: [],
    isLoading: false,
    hasError: false
  });
  const [modalWindow, setModalWindow] = React.useState({
    open: false,
    type: undefined,
    orderNumber: null
  });
  const {data} = state;


  // Этот редьюсер сортирует элементы в зависимости от action.type. Работают 2 функции: Добавление элементов и удаление элементов из бургера. Все элементы с increment - добавляют в бургер новый ингредиенты. Все элементы с decrement - удаляют элементы из бургера. Dispatch для удаления пока что прописан не будет, но это заготовка на будущее. (Удаляться ингредиенты не будут пока что)
  function reducer(burger, action) {
    switch (action.type) {
      case 'increment-bun': {
        return {
          ...burger,
          bun: action.elem
        };
      }
      case 'decrement-bun': {
        return {
          ...burger,
          bun: initialBurger.bun
        };
      }
      case 'increment-ingredients': {
        return {
          ...burger,
          ingredients: [...burger.ingredients, action.elem]
        };
      }
      case 'decrement-ingredients': {
        return {
          ...burger,
          ingredients: burger.ingredients.filter(ingredient => ingredient._id !== action.elem._id)
        };
      }
      default: throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  React.useEffect(() => {
    getData(state, setState);
  }, [])

  const getWindowHeight = () => {
    return window.innerHeight - 520;
  }

  const addIngredientToBurger = (elem) => {
    elem.type === 'bun' ? dispatchBurger({type: 'increment-bun', elem: elem}) : dispatchBurger({type: 'increment-ingredients', elem: elem});
  }

  const findIngredient = (id) => {
    addIngredientToBurger(data.find((elem) => elem._id === id));
  }

  const handleModal = (elem, number) => {
    elem.type === 'submit' ? setModalWindow({
      orderNumber: number,
      open: !modalWindow.open,
      type: elem.type
    }) : 
    setModalWindow({
      orderNumber: null,
      open: !modalWindow.open,
      type: elem
    });
  }

  const modal = (
    <Modal>
      {modalWindow.type === 'submit' ? <OrderDetails /> : <IngredientDetails />}
    </Modal>
  )

  return (
    <StateContext.Provider value={state}>
      <BurgerContext.Provider value={{burger, findIngredient}}>
        <ModalContext.Provider value={{modalWindow, setModalWindow, handleModal}}>
          <div className={styles.app}>
            {modalWindow.open && modal}
            <AppHeader />
            <section className={styles.constructor} id='section'>
              <BurgerIngredients />
              <BurgerConstructor getWindowHeight={getWindowHeight} />
            </section>
          </div>
        </ModalContext.Provider>
      </BurgerContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
