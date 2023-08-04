import { createOrderRequest } from "../../utils/burger-api";
import { OPEN_MODAL } from "./modal-ingredient";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

const createOrder = (burger) => (dispatch) => {
  dispatch({type: CREATE_ORDER_REQUEST});
  let arr = [];
    if (burger.bun._id === undefined) {
      arr = burger.ingredients.map(ingredient => ingredient._id);
    } else {
      arr = burger.ingredients.map(ingredient => ingredient._id).concat(burger.bun._id);
    }
  createOrderRequest(arr).then(data => {
    dispatch({type: CREATE_ORDER_SUCCESS, ingredients: arr, number: data.order.number});
    dispatch({type: OPEN_MODAL, ingredient: 'submit'});
  })
  .catch(err => {
    dispatch({type: CREATE_ORDER_FAILURE});
    console.log(`Произошла ошибка №${err}`);
  });;
}

export default createOrder