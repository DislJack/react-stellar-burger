import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {store} from '../index';
import { TResetPasswordSendCodeAction } from './actions/auth';
import { TIngredientAction } from './actions/burger-constructor';
import { TConnectionAction, TWSFeedAction } from './actions/feed';
import { TCreateOrderAction } from './actions/final-order';
import { TGetIngredientsAction } from './actions/ingredient-list';
import { TModalAction } from './actions/modal-ingredient';
import { TUserAction } from './actions/user-data';


export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions = TResetPasswordSendCodeAction 
  | TIngredientAction
  | TConnectionAction
  | TWSFeedAction
  | TCreateOrderAction
  | TGetIngredientsAction
  | TModalAction
  | TUserAction;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;