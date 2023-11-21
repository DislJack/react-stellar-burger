export const ORDER_HISTORY_CONNECT = 'ORDER_HISTORY_CONNECT';
export const ORDER_HISTORY_DISCONNECT = 'ORDER_HISTORY_DISCONNECT';
export const ORDER_HISTORY_WS_OPEN = 'FEED_PAGE_WS_OPEN';
export const ORDER_HISTORY_WS_MESSAGE = 'FEED_PAGE_WS_MESSAGE';
export const ORDER_HISTORY_WS_CLOSE = 'FEED_PAGE_WS_CLOSE';
export const ORDER_HISTORY_WS_ERROR = 'FEED_PAGE_WS_ERROR';

export const connectHistory = (url) => ({
  type: ORDER_HISTORY_CONNECT,
  payload: url
});

export const disconnectHistory = () => ({
  type: ORDER_HISTORY_DISCONNECT
})