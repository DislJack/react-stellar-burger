import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';
import { ingredientPropType } from '../../utils/prop-types';

function BurgerIngredients({data, burger, selectIngredient, handleModal}) {
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
        <IngredientSection data={data} burger={burger} selectIngredient={selectIngredient} handleModal={handleModal} type={'bun'} heading={'Булки'} />
        <IngredientSection data={data} burger={burger} selectIngredient={selectIngredient} handleModal={handleModal} type={'sauce'} heading={'Соусы'} />
        <IngredientSection data={data} burger={burger} selectIngredient={selectIngredient} handleModal={handleModal} type={'main'} heading={'Начинка'} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  burger: PropTypes.shape({
    bun: PropTypes.object,
    ingredients: PropTypes.arrayOf(ingredientPropType)
  }),
  selectIngredient: PropTypes.func,
  handleModal: PropTypes.func
}

export default BurgerIngredients;