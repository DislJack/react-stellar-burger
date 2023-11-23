import { ORDER_HISTORY_WS_MESSAGE} from "../actions/order-history"
import { FEED_PAGE_WS_OPEN, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR } from "../actions/feed";


const initialState = {
  wsConnected: false,
  data: [],
  error: ''
}

const orderHistoryPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEED_PAGE_WS_OPEN: {
      return {
        ...state,
        wsConnected: true,
        error: ''
      }
    }
    case FEED_PAGE_WS_CLOSE: {
      return {
        ...state,
        wsConnected: false
      }
    }
    case FEED_PAGE_WS_ERROR: {
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