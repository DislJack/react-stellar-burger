import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./services/reducers/root-reducer";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { socketMiddleware } from "./services/socketMiddleware";
import { FEED_PAGE_CONNECT, FEED_PAGE_DISCONNECT, FEED_PAGE_WS_CLOSE, FEED_PAGE_WS_ERROR, FEED_PAGE_WS_MESSAGE, FEED_PAGE_WS_OPEN } from "./services/actions/feed";
import { ORDER_HISTORY_CONNECT, ORDER_HISTORY_DISCONNECT, ORDER_HISTORY_WS_OPEN, ORDER_HISTORY_WS_CLOSE, ORDER_HISTORY_WS_MESSAGE, ORDER_HISTORY_WS_ERROR } from "./services/actions/order-history";

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const listActionsSocketFeed = socketMiddleware({
  wsConnect: FEED_PAGE_CONNECT,
  wsDisconnect: FEED_PAGE_DISCONNECT,
  onOpen: FEED_PAGE_WS_OPEN,
  onClose: FEED_PAGE_WS_CLOSE,
  onError: FEED_PAGE_WS_ERROR,
  onMessage: FEED_PAGE_WS_MESSAGE,
  wsConnectHistory: ORDER_HISTORY_CONNECT,
  wsDisconnecHistory: ORDER_HISTORY_DISCONNECT,
  onOpenHistory: ORDER_HISTORY_WS_OPEN,
  onCloseHistory: ORDER_HISTORY_WS_CLOSE,
  onErrorHistory: ORDER_HISTORY_WS_ERROR,
  onMessageHistory: ORDER_HISTORY_WS_MESSAGE
})

const enhancer = composeEnhancers(applyMiddleware(thunk, listActionsSocketFeed));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
