import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAILURE } from "../constants/final-order";
import { TCreateOrderAction } from "../actions/final-order";

type TInitialOrder = {
  ingredients: string[];
  number: string;
  isLoading: boolean;
  hasError: boolean;
}

const initialOrder: TInitialOrder = {
  ingredients: [],
  number: '',
  isLoading: false,
  hasError: false
}

const finalOrderReducer = (order = initialOrder, action: TCreateOrderAction) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...order,
        isLoading: true
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...order,
        isLoading: false,
        ingredients: action.ingredients,
        number: action.number
      }
    }
    case CREATE_ORDER_FAILURE: {
      return {
        ...order,
        hasError: true,
        isLoading: false
      }
    }
    default: return order
  }
}

export default finalOrderReducer;