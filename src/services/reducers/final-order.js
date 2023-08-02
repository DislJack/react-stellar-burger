import { CREATE_ORDER, SEND_ORDER } from "../actions/final-order";

const initialOrder = {
  ingredients: [],
  number: ''
}

const finalOrderReducer = (order = initialOrder, action) => {
  switch (action.type) {
    case CREATE_ORDER: {
      return {
        ...order,
        ingredients: action.ingredients
      }
    }
    case SEND_ORDER: {
      return {
        ...order,
        number: action.number
      }
    }
    default: return order
  }
}

export default finalOrderReducer;