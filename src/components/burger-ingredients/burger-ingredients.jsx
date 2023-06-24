import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('one');
  return (
    <div className={styles.container}>
      <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
      <div className={styles.tab}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>Булки</Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>Соусы</Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>Начинка</Tab>
      </div>
      <div className='custom-scroll' style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', marginTop: 40, gap: 40}}>
        <IngredientSection data={props.data} type={'bun'} heading={'Булки'} />
        <IngredientSection data={props.data} type={'sauce'} heading={'Соусы'} />
        <IngredientSection data={props.data} type={'main'} heading={'Начинка'} />
      </div>
    </div>
  )
}

export default BurgerIngredients;