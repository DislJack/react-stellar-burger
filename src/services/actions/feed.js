export const FEED_PAGE_CONNECT = 'FEED_PAGE_CONNECT';
export const FEED_PAGE_DISCONNECT = 'FEED_PAGE_DISCONNECT';
export const FEED_PAGE_WS_OPEN = 'FEED_PAGE_WS_OPEN';
export const FEED_PAGE_WS_MESSAGE = 'FEED_PAGE_WS_MESSAGE';
export const FEED_PAGE_WS_CLOSE = 'FEED_PAGE_WS_CLOSE';
export const FEED_PAGE_WS_ERROR = 'FEED_PAGE_WS_ERROR';

export const connect = (url) => ({
  type: FEED_PAGE_CONNECT,
  payload: url
});

export const disconnect = () => ({
  type: FEED_PAGE_DISCONNECT
})