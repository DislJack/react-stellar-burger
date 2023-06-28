import styles from './burger-constrictor.module.css';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({burger, getWindowHeight}) {
  return (
    <form className={styles.grid}>
      <div className={styles.ingredients}>
        {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (верх)'} price={burger.bun.price} thumbnail={burger.bun.image} type='top' key={burger.bun._id + 'top'} extraClass='pr-8 mr-4' isLocked={true} />}
        <ul className='custom-scroll' style={{display: 'flex', padding: '0 6px 0 0', listStyleType: 'none', margin: 0, flexDirection: 'column', gap: '16px', overflowY: 'scroll', maxHeight: getWindowHeight(), boxSizing: 'border-box'}}>
          {burger.ingredients.map((ingredient) => {
            return <li className={styles.drag}><DragIcon /><ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} key={ingredient._id} /></li>
          })}
        </ul>
        {burger.bun._id === undefined ? '' : <ConstructorElement text={burger.bun.name + ' (низ)'} price={burger.bun.price} thumbnail={burger.bun.image} type='bottom' key={burger.bun._id + 'bottom'} extraClass='pr-8 mr-4' isLocked={true} />}
      </div>
      {burger.bun._id === undefined || burger.ingredients === [] ? '' : <div className={styles.final}>
        <p className='text text_type_digits-medium' style={{display: 'flex', alignItems: 'center', gap: 8}}><CurrencyIcon /></p>
        <Button htmlType='submit' size='large' type='primary'>Оформить заказ</Button>
      </div>}
    </form>
  )
}

export default BurgerConstructor;