import { combineReducers } from "redux"
import burgerReducer from "./burger-constructor";
import stateReducer from "./ingredient-list";
import modalIngredientReducer from "./modal-ingredient";
import finalOrderReducer from "./final-order";

const rootReducer = combineReducers({
  burger: burgerReducer,
  state: stateReducer,
  modal: modalIngredientReducer,
  order: finalOrderReducer
});

export default rootReducer;