import styles from "./app.module.css";
import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getData } from "../../utils/burger-api";


function App() {
  const [burger, setBurger] = React.useState({
    bun: {},
    ingredients: []
  });
  const [state, setState] = React.useState({
    data: [],
    isLoading: false,
    hasError: false
  });
  const [modalWindow, setModalWindow] = React.useState({
    open: false,
    type: undefined
  });
  const {data} = state;

  React.useEffect(() => {
    getData(state, setState);
  }, [])

  const getWindowHeight = () => {
    return window.innerHeight - 520;
  }

  const addIngredientToBurger = (elem) => {
    if (elem.type === 'bun') {
      setBurger({
        ...burger, 
        bun: elem
      });
    } else {
      setBurger({
        ...burger, 
        ingredients: [
          ...burger.ingredients, 
          elem
        ]});
    }
  }

  const findIngredient = (id) => {
    addIngredientToBurger(data.find((elem) => elem._id === id));
  }

  const handleModal = (elem) => {
    elem.type === 'submit' ? setModalWindow({
      open: !modalWindow.open,
      type: elem.type
    }) : 
    setModalWindow({
      open: !modalWindow.open,
      type: elem
    });
  }

  const modal = (
    <Modal modalWindow={modalWindow} handleModal={handleModal} setModalWindow={setModalWindow}>
      {modalWindow.type === 'submit' ? <OrderDetails /> : <IngredientDetails ingredient={modalWindow.type} />}
    </Modal>
  )

  return (
    <div className={styles.app}>
      {modalWindow.open && modal}
      <AppHeader />
      <section className={styles.constructor} id='section'>
        <BurgerIngredients data={data} burger={burger} selectIngredient={findIngredient} handleModal={handleModal} />
        <BurgerConstructor burger={burger} getWindowHeight={getWindowHeight} handleModal={handleModal} />
      </section>
    </div>
  );
}

export default App;
