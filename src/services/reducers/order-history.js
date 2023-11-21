import { ORDER_HISTORY_WS_OPEN, ORDER_HISTORY_WS_MESSAGE, ORDER_HISTORY_WS_CLOSE, ORDER_HISTORY_WS_ERROR } from "../actions/order-history"

const initialState = {
  wsConnected: false,
  data: [],
  error: ''
}

const orderHistoryPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_HISTORY_WS_OPEN: {
      return {
        ...state,
        wsConnected: true,
        error: ''
      }
    }
    case ORDER_HISTORY_WS_CLOSE: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case ORDER_HISTORY_WS_ERROR: {
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      }
    }
    case ORDER_HISTORY_WS_MESSAGE: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state;
  }
}

export default orderHistoryPageReducer;