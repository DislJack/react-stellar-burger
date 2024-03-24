import { TOrder } from "../../utils/prop-types";
import { FEED_PAGE_CONNECT, FEED_PAGE_DISCONNECT, FEED_PAGE_WS_OPEN, FEED_PAGE_WS_ERROR, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_MESSAGE } from "../constants/feed";

export type TConnectAction = {
  readonly type: typeof FEED_PAGE_CONNECT;
  readonly payload: string;
}

export type TDisconnectAction = {
  readonly type: typeof FEED_PAGE_DISCONNECT;
}

export type TWSOpenFeedAction = {
  readonly type: typeof FEED_PAGE_WS_OPEN;
}

export type TWSCloseFeedAction = {
  readonly type: typeof FEED_PAGE_WS_CLOSE;
}

export type TWSErrorFeedAction = {
  readonly type: typeof FEED_PAGE_WS_ERROR;
  readonly payload: string;
}

export type TWSMessageFeedAction = {
  readonly type: typeof FEED_PAGE_WS_MESSAGE;
  readonly payload: {
    success: boolean;
    orders: Array<TOrder>;
    total: number;
    totalToday: number
  };
}

export type TWSFeedAction = TWSOpenFeedAction | TWSCloseFeedAction | TWSErrorFeedAction;

export type TConnectionAction = TConnectAction | TDisconnectAction;

export const connect = (url: string): TConnectAction => ({
  type: FEED_PAGE_CONNECT,
  payload: url
});

export const disconnect = (): TDisconnectAction => ({
  type: FEED_PAGE_DISCONNECT
})