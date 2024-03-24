import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal-ingredient";
import { TModalAction } from "../actions/modal-ingredient";
import { TIngredientPropType } from "../../utils/prop-types";

export type TInitialModal = {
  open: boolean;
  ingredient?: 'submit' | TIngredientPropType;
}

const initialState: TInitialModal = {
  open: false,
  ingredient: undefined
}

const modalIngredientReducer = (modal = initialState, action: TModalAction) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...modal,
        open: true,
        ingredient: action.ingredient
      }
    }
    case CLOSE_MODAL: {
      return {
        ...modal,
        open: false,
        ingredient: undefined
      }
    }
    default: return modal
  }
}

export default modalIngredientReducer;