export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

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