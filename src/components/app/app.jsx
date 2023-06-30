import styles from "./app.module.css";
import React from 'react';
import { data } from "../../utils/data";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [burger, setBurger] = React.useState({
    bun: {},
    ingredients: []
  });

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
