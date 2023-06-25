import styles from './burger-constrictor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';

function BurgerConstructor() {
  return (
    <form className={styles.grid}>
      <div className={styles.ingredients}>
        <IngredientConstructor ariaDetails="bunTop" />
        <div className={styles.extra}>

        </div>
        <IngredientConstructor ariaDetails="bunBottom" />
      </div>
      <div className={styles.final}>
        <p className='text text_type_digits-medium'>610 <CurrencyIcon /></p>
        <Button htmlType='submit' size='large' type='primary'>Оформить заказ</Button>
      </div>
    </form>
  )
}

export default BurgerConstructor;