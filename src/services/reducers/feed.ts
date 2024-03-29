import { FEED_PAGE_WS_OPEN, FEED_PAGE_WS_MESSAGE, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR } from "../constants/feed";
import { TOrder } from "../../utils/prop-types";
import { TWSFeedAction, TWSMessageFeedAction } from "../actions/feed";

export type TInitialSocket = {
  wsConnected: boolean;
  data: {
    success?: boolean;
    orders: TOrder[];
    total?: number;
    totalToday?: number;
  };
  error: string
}

const initialState: TInitialSocket = {
  wsConnected: false,
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: ''
}

// Прописать типы для Экшенов в мидлваре
const feedPageReducer = (state = initialState, action: TWSFeedAction | TWSMessageFeedAction) => {
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
    case FEED_PAGE_WS_MESSAGE: {
      return {
        ...state,
        data: action.payload
      }
    }
    default:
      return state;
  }
}

export default feedPageReducer;