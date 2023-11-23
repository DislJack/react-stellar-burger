import { ADD_BUN, REMOVE_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_INDREDIENT_LIST, CLEAR_INGREDIENTS } from "../actions/burger-constructor";

const initialBurger = {
  bun: {},
  ingredients: []
};


const burgerReducer = (burger = initialBurger, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...burger,
        bun: action.elem
      };
    }
    case REMOVE_BUN: {
      return {
        ...burger,
        bun: {}
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...burger,
        ingredients: [...burger.ingredients, action.elem]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...burger,
        ingredients: burger.ingredients.filter(ingredient => ingredient.key !== action.elem)
      };
    }
    case UPDATE_INDREDIENT_LIST: {
      return {
        ...burger,
        ingredients: burger.ingredients
      }
    }
    case CLEAR_INGREDIENTS: {
      return {
        bun: {},
        ingredients: []
      }
    }
    default: return burger;
  }
}

export default burgerReducer