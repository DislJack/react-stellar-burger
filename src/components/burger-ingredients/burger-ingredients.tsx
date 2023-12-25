import React, { useRef } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';
import { selectIngredientList } from '../../services/selectors';
import { useSelector } from '../../services/hooks';

function BurgerIngredients() {
  const data = useSelector(selectIngredientList);
  const [current, setCurrent] = React.useState<string>('bun');
  const tabs = useRef<HTMLDivElement | any>(null);
  const bun = useRef<HTMLHeadingElement | any>(null);
  const sauce = useRef<HTMLHeadingElement | any>(null);
  const main = useRef<HTMLHeadingElement | any>(null);

  const scrollEvent = () => {
    const tabsList: number = tabs.current.getBoundingClientRect().bottom;
    const buns: number = bun.current.getBoundingClientRect().top;
    const sauces: number = sauce.current.getBoundingClientRect().top;
    const mains: number = main.current.getBoundingClientRect().top;
    if (tabsList <= buns) {
      setCurrent('bun');
    } else if (tabsList > buns && tabsList <= sauces) {
      tabsList - buns === Math.min(tabsList - buns, sauces - tabsList, mains - tabsList) ? setCurrent('bun') : setCurrent('souce');
    } else if (tabsList > sauces && tabsList < mains) {
      tabsList - sauces === Math.min(tabsList - buns, tabsList - sauces, mains - tabsList) ? setCurrent('souce') : setCurrent('main');
    } else {
      setCurrent('main');
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
        <div className={styles.tab} ref={tabs} >
          <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
          <Tab value='souce' active={current === 'souce'} onClick={setCurrent}>Соусы</Tab>
          <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинка</Tab>
        </div>
        <div className='custom-scroll' style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', marginTop: 40, gap: 40}} onScroll={scrollEvent}>
          <IngredientSection ingredients={data.buns} heading={'Булки'} ref={bun} />
          <IngredientSection ingredients={data.sauces} heading={'Соусы'} ref={sauce} />
          <IngredientSection ingredients={data.main} heading={'Начинка'} ref={main} />
        </div>
      </div>
    </>
  )
}

export default BurgerIngredients;