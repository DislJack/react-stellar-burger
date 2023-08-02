import { createOrderRequest } from "../../utils/burger-api";
import { OPEN_MODAL, CHOOSE_INGREDIENT } from "./modal-ingredient";

export const CREATE_ORDER = 'CREATE_ORDER';
export const SEND_ORDER = 'SEND_ORDER';

const createOrder = (burger) => (dispatch) => {
  let arr = [];
    if (burger.bun._id === undefined) {
      arr = burger.ingredients.map(ingredient => ingredient._id);
    } else {
      arr = burger.ingredients.map(ingredient => ingredient._id).concat(burger.bun._id);
    }
  createOrderRequest(arr).then(data => {
    dispatch({type: CREATE_ORDER, ingredients: arr});
    dispatch({type: SEND_ORDER, number: data.order.number});
    dispatch({type: OPEN_MODAL});
    dispatch({type: CHOOSE_INGREDIENT, ingredient: 'submit'})
  })
  .catch(err => {
    console.log(`Произошла ошибка №${err}`)
  });;
}

export default createOrder