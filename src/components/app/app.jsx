import styles from "./app.module.css";
import React from 'react';
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";


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
  const {data} = state;

  React.useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    setState({...state, isLoading: true});
    fetch('https://norma.nomoreparties.space/api/ingredients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setState({...state, isLoading: false, data: data.data}))
      .catch(err => {
        setState({...state, hasError: true, isLoading: false});
        console.log(`Произошла ошибка №${err}`)
      })
  }

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


  const modal = (
    <Modal>
      {/* Нужно тут дописать логику выбора наполнения модального окна в зависимости от сработанного эвента через тернарный оператор */}
    </Modal>
  )

  return (
    <div className={styles.app}>
      <AppHeader />
      <section className={styles.constructor} id='section'>
        <BurgerIngredients data={data} burger={burger} selectIngredient={findIngredient} />
        <BurgerConstructor burger={burger} getWindowHeight={getWindowHeight} />
      </section>
    </div>
  );
}

export default App;
