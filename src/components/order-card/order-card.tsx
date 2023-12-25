import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { selectIngredientList } from '../../services/selectors';
import { TOrder } from '../../utils/prop-types';
import { useSelector } from '../../services/hooks';

type TListIngredeints = {
  _id: string;
  count: number;
}

type TOrderCard = {
  order: TOrder;
}

function OrderCard({order}: TOrderCard) {
  const data = useSelector(selectIngredientList);
  const indregientsData = data.buns.concat(data.sauces, data.main);
  const currentIngredient = (ingredient: TListIngredeints) => indregientsData.find(ing => ing._id === ingredient._id);


  // Эта функция позволит оптимизировать список ингредиентов и убрать повторяющиеся элементы заказа,
  // показав только колличество однотипных ингредиентов
  const filteredOrder = () => {
    // Создаём пустой массив в который будем записывать объекты с полями _id и count
    let array: Array<TListIngredeints> = [];

    // Отделяем булки от всех игредиентов
    const buns = order.ingredients.filter(ingredient => {
      return data.buns.find(bun => bun._id === ingredient)
    });

    // записываем булки в массив
    array = buns[0] === undefined ? [] : [{
      _id: buns[0],
      count: 1
    }];

    // Создаём массив ингредиентов без булок чтобы фильтровать и считать одинаковое колличество ингредиентов
    const main = order.ingredients.filter(ingredient => {
      return data.sauces.concat(data.main).find(bun => bun._id === ingredient)
    });

    // Считаем одинаковое колличество ингредиентов с помощью фильтрации массива и длины массива.
    data.sauces.concat(data.main).forEach(ingredient => {
      const sameIngredients = main.filter(ing => ing === ingredient._id);

      // Записываем ингредиент и его колличество в массив.
      if (sameIngredients.length !== 0) {
        array = [...array, {
          _id: sameIngredients[0],
          count: sameIngredients.length
        }]
      }
    });

    // Возвращаем массив объектов из функции.
    return array;
  }

  // Функция подсчёта общей цены для всего заказа.
  const totalPrice = () => {
    const array = filteredOrder().map(ingredient => {
      return indregientsData.find(ing => ing._id === ingredient._id).price*ingredient.count;
    });
    const price = array[0]*2;
    return array.slice(1, array.length).reduce((accum, current) => {return accum + current}, price);
  }

  return (
    <div className={styles.card}>
      <div className={styles.data}>
        <h3 className='text text_type_digits-default'>{order.number}</h3>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(`${order.updatedAt}`)} />
      </div>
      <p className='text text_type_main-medium'>{order.name}</p>
      <div className={styles.box}>
        <div className={filteredOrder().length >= 9 ? styles.scroll + ' custom-scroll' : styles.ingredients}>
          {filteredOrder().map((ingredient, index) => {
            return (<div className={styles.boximage} key={ingredient._id} style={{zIndex: filteredOrder().length - index}}>
              <img className={styles.image} src={indregientsData.find(ing => ing._id === ingredient._id).image} alt={indregientsData.find(ing => ing._id === ingredient._id).name} />
              {ingredient.count > 1 && <div className={styles.counter}></div>}
              {ingredient.count > 1 && <p className={`${styles.text} text text_type_digits-default`}>{'+' + ingredient.count}</p>}
            </div>)
          })}
        </div>
        <div className={styles.price}>
          <p className='text text_type_digits-default'>{totalPrice()}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}

export default OrderCard;