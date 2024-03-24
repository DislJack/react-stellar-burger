import { TWSFeedAction, TConnectionAction, TWSMessageFeedAction } from "./actions/feed";
import { FEED_PAGE_CONNECT, FEED_PAGE_DISCONNECT, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR, FEED_PAGE_WS_MESSAGE, FEED_PAGE_WS_OPEN } from "./constants/feed";
import { ORDER_HISTORY_WS_MESSAGE } from "./constants/order-history";
import { TWSOrderHistoryMessageAction } from "./reducers/order-history";

type TMiddleWareActions = {
  wsConnect:  typeof FEED_PAGE_CONNECT;
  wsDisconnect: typeof FEED_PAGE_DISCONNECT;
  onOpen: typeof FEED_PAGE_WS_OPEN;
  onClose: typeof FEED_PAGE_WS_CLOSE;
  onError: typeof FEED_PAGE_WS_ERROR;
  onMessage: typeof FEED_PAGE_WS_MESSAGE;
  onMessageHistory: typeof ORDER_HISTORY_WS_MESSAGE;
  wsSendMessage?: 'WS_SEND_MESSAGE';
}

type TWSSendMessage = {
  readonly type: 'WS_SEND_MESSAGE';
  readonly payload: string;
}

export const socketMiddleware = (wsActions: TMiddleWareActions) => {
  return (store: { dispatch: (arg: TWSFeedAction | TConnectionAction | TWSOrderHistoryMessageAction | TWSMessageFeedAction) => void }) => {
    let socket: null | WebSocket = null;

    return (next: (arg: TWSFeedAction | TConnectionAction | TWSSendMessage | TWSOrderHistoryMessageAction | TWSMessageFeedAction) => void) => (action: TConnectionAction | TWSFeedAction | TWSSendMessage | TWSOrderHistoryMessageAction | TWSMessageFeedAction) => {
      const {dispatch} = store;
      const {type} = action;
      const {
        wsConnect,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsSendMessage,
        onMessageHistory
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        }

        socket.onerror = () => {
          dispatch({type: onError, payload: 'Error'});
        }

        socket.onmessage = (event: MessageEvent<string>) => {
          type === onMessage ? 
          dispatch({type: onMessage, payload: JSON.parse(event.data)}) : 
          dispatch({type: onMessageHistory, payload: JSON.parse(event.data)})
        }

        socket.onclose = () => {
          dispatch({type: onClose})
        }

        if (type === wsSendMessage) {
          socket.send(JSON.stringify(action.payload))
        }
  
        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    }
  }
}