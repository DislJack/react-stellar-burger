import { createOrderRequest } from "../../utils/burger-api";
import { CLEAR_INGREDIENTS } from "../constants/burger-constructor";
import { OPEN_MODAL } from "../constants/modal-ingredient";
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from "../constants/final-order";
import { TIngredientPropType } from "../../utils/prop-types";
import { AppDispatch } from "../types";

export type TCreateOrderRequestAction = {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export type TCreateOrderSuccessAction = {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly ingredients: [];
  readonly number: string;
}

export type TOpenModalAction = {
  readonly type: typeof OPEN_MODAL;
  ingredient: string;
}

export type TClearIngredients = {
  readonly type: typeof CLEAR_INGREDIENTS;
}

export type TCreateOrderFailureAction = {
  readonly type: typeof CREATE_ORDER_FAILURE;
}

type TBurger = {
  bun: TIngredientPropType;
  ingredients: Array<TIngredientPropType>
}

export type TCreateOrderAction = TCreateOrderRequestAction 
  | TCreateOrderSuccessAction 
  | TCreateOrderFailureAction;

const createOrder = (burger: TBurger) => (dispatch: AppDispatch) => {
  dispatch({type: CREATE_ORDER_REQUEST});
  let arr: Array<string | undefined> = [];
    if (burger.bun._id === undefined) {
      arr = burger.ingredients.map(ingredient => ingredient._id);
    } else {
      arr = burger.ingredients.map(ingredient => ingredient._id).concat(burger.bun._id);
    }
  createOrderRequest(arr).then(data => {
    dispatch({type: CREATE_ORDER_SUCCESS, ingredients: arr, number: data.order.number});
    dispatch({type: OPEN_MODAL, ingredient: 'submit'});
    dispatch({type: CLEAR_INGREDIENTS})
  })
  .catch(err => {
    dispatch({type: CREATE_ORDER_FAILURE});
    console.log(`Произошла ошибка №${err}`);
  });;
}

export default createOrder