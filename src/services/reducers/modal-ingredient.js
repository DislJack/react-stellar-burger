import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal-ingredient"

const initialState = {
  open: false,
  ingredient: undefined
}

const modalIngredientReducer = (modal = initialState, action) => {
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