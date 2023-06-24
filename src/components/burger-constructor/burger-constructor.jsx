import styles from './burger-constrictor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientConstructor from '../ingredient-constructor/ingredient-constructor';

function BurgerConstructor() {
  return (
    <form>
      <div>
        {/* <IngredientConstructor ariaDetails="bunTop" /> */}
        <div>

        </div>
        {/* <IngredientConstructor ariaDetails="bunBottom" /> */}
      </div>
      <p>610 <CurrencyIcon /></p>
      <Button htmlType='submit' size='large' type='primary'>Оформить заказ</Button>
    </form>
  )
}

export default BurgerConstructor;