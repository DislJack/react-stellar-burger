import { OPEN_MODAL, CLOSE_MODAL, CHOOSE_INGREDIENT, CLEAR_MODAL_WINDOW } from "../actions/modal-ingredient"

const initialState = {
  open: false,
  ingredient: undefined
}

const modalIngredientReducer = (modal = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...modal,
        open: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...modal,
        open: false
      }
    }
    case CHOOSE_INGREDIENT: {
      return {
        ...modal,
        ingredient: action.ingredient
      }
    }
    case CLEAR_MODAL_WINDOW: {
      return {
        ...modal,
        ingredient: undefined
      }
    }
    default: return modal
  }
}

export default modalIngredientReducer;