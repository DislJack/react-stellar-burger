import { combineReducers } from "redux"
import burgerReducer from "./burger-constructor";
import stateReducer from "./ingredient-list";
import modalIngredientReducer from "./modal-ingredient";
import finalOrderReducer from "./final-order";
import authReducer from "./auth";
import getUserDataReducer from "./user-data";

const rootReducer = combineReducers({
  burger: burgerReducer,
  state: stateReducer,
  modal: modalIngredientReducer,
  order: finalOrderReducer,
  auth: authReducer,
  user: getUserDataReducer
});

export default rootReducer;