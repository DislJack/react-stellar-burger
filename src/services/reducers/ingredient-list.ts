import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILURE } from "../constants/ingredient-list";
import { TGetIngredientsAction } from "../actions/ingredient-list";
import { TIngredientPropType } from "../../utils/prop-types";

type TInitialState = {
  data: {
    buns: Array<TIngredientPropType>;
    sauces: Array<TIngredientPropType>;
    main: Array<TIngredientPropType>;
  }
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TInitialState = {
  data: {
    buns: [],
    sauces: [],
    main: []
  },
  isLoading: false,
  hasError: false
}

const stateReducer = (state = initialState, action: TGetIngredientsAction) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_INGREDIENTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
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