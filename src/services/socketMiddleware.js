export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    let history = null;

    return next => action => {
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
        wsConnectHistory,
        wsDisconnectHistory,
        onOpenHistory,
        onCloseHistory,
        onErrorHistory,
        onMessageHistory,
        wsSendMessageHistory
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
          dispatch({type: onMessage, payload: JSON.parse(event.data)})
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

      if (type === wsConnectHistory) {
        history = new WebSocket(action.payload);
      }

      if (history) {
        history.onopen = () => {
          dispatch({type: onOpenHistory});
        }

        history.onerror = () => {
          dispatch({type: onErrorHistory, payload: 'Error'});
        }

        history.onmessage = event => {
          dispatch({type: onMessageHistory, payload: JSON.parse(event.data)})
        }

        history.onclose = () => {
          dispatch({type: onCloseHistory})
        }

        if (type === wsSendMessageHistory) {
          history.send(JSON.stringify(action.payload))
        }
  
        if (type === wsDisconnectHistory) {
          history.close();
          history = null;
        }
      }
      next(action);
    }
  }
}