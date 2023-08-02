import { GET_INGREDIENTS, IS_LOADING, HAS_ERROR } from "../actions/ingredient-list";

const initialState = {
  data: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false
}

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true
      }
    }
    case HAS_ERROR: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    case GET_INGREDIENTS: {
      return {
        ...state,
        isLoading: false,
        data: {
          buns: action.elem.filter((ingredient) => ingredient.type === 'bun'),
          sauces: action.elem.filter((ingredient) => ingredient.type === 'sauce'),
          main: action.elem.filter((ingredient) => ingredient.type === 'main')
        }
      }
    }
    default: return state
  }
}

export default stateReducer;