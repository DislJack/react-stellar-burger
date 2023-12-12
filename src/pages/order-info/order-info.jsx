import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import {useEffect, useState} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIngredientList } from '../../services/selectors';
import { requestOrder } from '../../utils/burger-api';
import CardHorizontal from '../../components/card-horizontal/card-horizontal';

function OrderInfo() {
  const {orderId, personalOrderId} = useParams();
  const ingredientsList = useSelector(selectIngredientList);
  const data = useSelector(store => store.socket.data);
  const personalOrderData = useSelector(store => store.orderHistory.data);
  const location = useLocation();
  const history = useHistory();
  const [order, setOrder] = useState({});


  // Эта функция отправляет API запрос на сервер при необходимости.
  const findOrderWithApi = () => {
    requestOrder(location.pathname === `/feed/${orderId}` ? orderId : personalOrderId).then(data => {
      setOrder(data.orders[0]);
    }).catch(err => {
      history.push('/error', { errorNumber: err.split(' ')[1]})
    });
  }

  // Эта функция вернёт заказ, если обновить страницу с заказом или перейти на на заказ, которого нет в массиве.
  const findOrder = () => {
    const order = data.orders !== undefined ? data.orders.find(ord => ord.number.toString() === orderId) : undefined;
    const personalOrder = personalOrderData.orders !== undefined ? personalOrderData.orders.find(ord => ord.number.toString() === personalOrderId) : undefined;
    if (location.pathname === `/feed/${orderId}`) {
      order !== undefined ? setOrder(order) : findOrderWithApi();
    } else {
      personalOrder !== undefined ? setOrder(personalOrder) : findOrderWithApi();
    };
  }


  // Эта функция сортирует массив так, чтобы было удобно считать колличество ингредиентов.
  const filteredOrder = () => {
    // Создаём пустой массив в который будем записывать объекты с полями _id и count
    let array = [];

    // Отделяем булки от всех игредиентов
    const buns = order.ingredients.filter(ingredient => {
      return ingredientsList.buns.find(bun => bun._id === ingredient)
    });

    // записываем булки в массив
    array = [{
      _id: buns[0],
      count: 1
    }];

    // Создаём массив ингредиентов без булок чтобы фильтровать и считать одинаковое колличество ингредиентов
    const main = order.ingredients.filter(ingredient => {
      return ingredientsList.sauces.concat(ingredientsList.main).find(bun => bun._id === ingredient)
    });

    // Считаем одинаковое колличество ингредиентов с помощью фильтрации массива и длины массива.
    ingredientsList.sauces.concat(ingredientsList.main).forEach(ingredient => {
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


  // Эта функция меняет условие заполнения статуса заказа. От содержимого статуса меняется и цвет статуса.
  const orderStatus = (status) => {
    switch (status) {
      case 'done': return 'Выполнен'
      case 'created': return 'Готовится'
      default: return 'Ищем повара'
    }
  }


  // Эта функция считает полную стоимость заказа
  const totalPrice = () => {
    const array = filteredOrder().map(ingredient => {
      return ingredientsList.buns.concat(ingredientsList.sauces, ingredientsList.main).find(ing => ing._id === ingredient._id).price*ingredient.count;
    });
    const price = array[0]*2;
    return array.slice(1, array.length).reduce((accum, current) => {return accum + current}, price);
  }


  // Происходит подгрузка карточки заказа при монтировании страницы
  useEffect(() => {
    findOrder();
  }, [])

  return (
        <>
          {order.number && <article className={styles.order}>
            <h2 className={`text text_type_digits-default mb-10 ${styles.heading}`}>#{order.number}</h2>
            <p className={`text text_type_main-medium mb-3 ${styles.name} custom-scroll`}>{order.name}</p>
            <p className={`text text_type_main-default mb-15 ${order.status === 'done' ? styles.status : styles.created}`}>{orderStatus(order.status)}</p>
            <p className={`text text_type_main-medium mb-6 ${styles.consist}`}>Состав:</p>
            <div className={`${filteredOrder().length > 3 ? styles.scroll : styles.ingredients} mb-10 custom-scroll pr-6`}>
              {filteredOrder().map(ingredient => {
                return <CardHorizontal ingredient={ingredient} key={ingredient._id} />
              })}
            </div>
            <div className={styles.info}>
              <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(order.updatedAt)}/>
              <div className={styles.price}>
                <p className='text text_type_digits-default'>{totalPrice()}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          </article>}
        </>
  )
}

export default OrderInfo;