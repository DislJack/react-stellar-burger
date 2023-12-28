import { ORDER_HISTORY_WS_MESSAGE} from "../constants/order-history";
import { FEED_PAGE_WS_OPEN, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR } from "../constants/feed";
import { TOrder } from "../../utils/prop-types";
import { TWSFeedAction } from "../actions/feed";

export type TWSOrderHistoryMessageAction = {
  readonly type: typeof ORDER_HISTORY_WS_MESSAGE;
  readonly payload: {
    success: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number
  };
}


export type TInitialOrderHistory = {
  wsConnected: boolean;
  data: {
    success?: boolean;
    orders?: TOrder[];
    total?: number;
    totalToday?: number;
  };
  error: string;
}


const initialState: TInitialOrderHistory = {
  wsConnected: false,
  data: {},
  error: ''
}

const orderHistoryPageReducer = (state = initialState, action: TWSFeedAction | TWSOrderHistoryMessageAction) => {
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