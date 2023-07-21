import styles from "./app.module.css";
import React from 'react';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/burger-api";
import { ModalContext } from "../../services/contexts/modalContext";
import { StateContext } from "../../services/contexts/stateContext";
import { BurgerContext } from "../../services/contexts/burgerContext";
import { burgerReducer } from "../../services/reducers/burgerReducer";
export const initialBurger = {
  bun: {},
  ingredients: []
};


function App() {
  const [burger, dispatchBurger] = React.useReducer(burgerReducer, initialBurger, undefined);
  const [state, setState] = React.useState({
    data: {
      buns: [],
      sauces: [],
      main: []
    },
    isLoading: false,
    hasError: false
  });
  const [modalWindow, setModalWindow] = React.useState({
    open: false,
    type: undefined,
    orderNumber: null
  });
  const {data} = state;


  React.useEffect(() => {
    getData(state, setState);
  }, []);

  return (
    <StateContext.Provider value={state}>
      <BurgerContext.Provider value={{burger, dispatchBurger}}>
        <ModalContext.Provider value={{modalWindow, setModalWindow}}>
          <div className={styles.app}>
            <AppHeader />
            <section className={styles.constructor} id='section'>
              <BurgerIngredients data={data} />
              <BurgerConstructor />
            </section>
          </div>
        </ModalContext.Provider>
      </BurgerContext.Provider>
    </StateContext.Provider>
  );
}

export default App;