import React, { useContext } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from '../ingredient-section/ingredient-section';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../modal/modal.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import { ModalContext } from '../../services/contexts/modalContext.jsx';

function BurgerIngredients({data}) {
  const [current, setCurrent] = React.useState('one');
  const {modalWindow, setModalWindow} = useContext(ModalContext);

  const handleModal = (elem) => {
    setModalWindow({
      orderNumber: null,
      open: !modalWindow.open,
      type: elem
    });
  }

  const modal = (
    <Modal modalWindow={modalWindow} handleModal={handleModal} setModalWindow={setModalWindow}>
      <IngredientDetails ingredient={modalWindow.type} />
    </Modal>
  )

  return (
    <>
      {modalWindow.open && typeof modalWindow.type === 'object' && modal}
      <div className={styles.container}>
        <h1 className='text text_type_main-large mt-10'>Соберите бургер</h1>
        <div className={styles.tab}>
          <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
          <Tab value='souce' active={current === 'souce'} onClick={setCurrent}>Соусы</Tab>
          <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинка</Tab>
        </div>
        <div className='custom-scroll' style={{overflowY: 'scroll', display: 'flex', flexDirection: 'column', marginTop: 40, gap: 40}}>
          <IngredientSection handleModal={handleModal} ingredients={data.buns} heading={'Булки'} />
          <IngredientSection handleModal={handleModal} ingredients={data.sauces} heading={'Соусы'} />
          <IngredientSection handleModal={handleModal} ingredients={data.main} heading={'Начинка'} />
        </div>
      </div>
    </>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    buns: PropTypes.arrayOf(ingredientPropType),
    sauces: PropTypes.arrayOf(ingredientPropType),
    main: PropTypes.arrayOf(ingredientPropType)
  })
}

export default BurgerIngredients;