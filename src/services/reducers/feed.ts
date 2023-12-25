import { FEED_PAGE_WS_OPEN, FEED_PAGE_WS_MESSAGE, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR } from "../constants/feed";
import { TOrder } from "../../utils/prop-types";
import { TWSFeedAction } from "../actions/feed";

type TInitialOrder = {
  wsConnected: boolean;
  data: ReadonlyArray<TOrder>;
  error: string
}

const initialState: TInitialOrder = {
  wsConnected: false,
  data: [],
  error: ''
}

// Прописать типы для Экшенов в мидлваре
const feedPageReducer = (state = initialState, action: TWSFeedAction) => {
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