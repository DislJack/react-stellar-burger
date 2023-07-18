import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');
  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value='souce' active={current === 'souce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинка</Tab>
      </div>
      <div className='custom-scroll' style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', marginTop: 40, gap: 40}}>
        <IngredientSection type={'bun'} heading={'Булки'} />
        <IngredientSection type={'sauce'} heading={'Соусы'} />
        <IngredientSection type={'main'} heading={'Начинка'} />
      </div>
    </div>
  )
}

export default BurgerIngredients;