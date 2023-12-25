import styles from "./home.module.css";
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useEffect} from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function HomePage() {

  useEffect(() => {
    localStorage.removeItem('acceptAccess');
  }, [])

  return (
    <section className={`${styles.constructor}`} id='section'>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </section>
  );
}

export default HomePage;