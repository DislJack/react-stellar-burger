import styles from "./home.module.css";
import Container from "../../components/container/container";
import AppHeader from "../../components/app-header/app-header";
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
    <Container>
      <AppHeader />
      <section className={styles.constructor} id='section'>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </section>
    </Container>
  );
}

export default HomePage;