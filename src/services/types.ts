import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {store} from '../index';
import { TResetPasswordSendCodeAction } from './actions/auth';
import { TIngredientAction } from './actions/burger-constructor';
import { TConnectionAction, TWSFeedAction, TWSMessageFeedAction } from './actions/feed';
import { TCreateOrderAction, TClearIngredients } from './actions/final-order';
import { TGetIngredientsAction } from './actions/ingredient-list';
import { TModalAction } from './actions/modal-ingredient';
import { TUserAction } from './actions/user-data';
import { TInitialBurger } from './reducers/burger-constructor';
import { TInitialState } from './reducers/ingredient-list';
import { TInitialModal } from './reducers/modal-ingredient';
import { TInitialSocket } from './reducers/feed';
import { TInitialAuth } from './reducers/auth';
import { TInitialUserData } from './reducers/user-data';
import { TInitialOrder } from './reducers/final-order';
import { TInitialOrderHistory, TWSOrderHistoryMessageAction } from './reducers/order-history';

// ReturnType от стора выдавал ошибку типизации, назначая некоторые состояния с типом never.
export type TRootState = {
  burger: TInitialBurger;
  state: TInitialState;
  modal: TInitialModal;
  order: TInitialOrder;
  auth: TInitialAuth;
  user: TInitialUserData;
  socket: TInitialSocket;
  orderHistory: TInitialOrderHistory;
}

type TApplicationActions = TResetPasswordSendCodeAction 
  | TIngredientAction
  | TConnectionAction
  | TWSFeedAction
  | TCreateOrderAction
  | TGetIngredientsAction
  | TModalAction
  | TUserAction
  | TClearIngredients
  | TWSMessageFeedAction
  | TWSOrderHistoryMessageAction

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;