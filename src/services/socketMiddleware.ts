import { TWSFeedAction, TConnectionAction } from "./actions/feed";

type TMiddleWareActions = {
  wsConnect: 'FEED_PAGE_CONNECT';
  wsDisconnect: 'FEED_PAGE_DISCONNECT';
  onOpen: 'FEED_PAGE_WS_OPEN';
  onClose: 'FEED_PAGE_WS_CLOSE';
  onError: 'FEED_PAGE_WS_ERROR';
  onMessage: 'FEED_PAGE_WS_MESSAGE';
  onMessageHistory: 'ORDER_HISTORY_WS_MESSAGE';
  wsSendMessage?: 'WS_SEND_MESSAGE';
}

type TWSSendMessage = {
  readonly type: 'WS_SEND_MESSAGE';
  readonly payload: string;
}

export const socketMiddleware = (wsActions: TMiddleWareActions) => {
  return (store: { dispatch: any }) => {
    let socket: null | WebSocket = null;

    return (next: (arg: TWSFeedAction | TConnectionAction | TWSSendMessage) => void) => (action: TConnectionAction | TWSFeedAction | TWSSendMessage) => {
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

        socket.onmessage = event => {
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