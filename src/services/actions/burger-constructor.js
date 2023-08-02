import {v4 as uuidv4} from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const UPDATE_INDREDIENT_LIST = 'UPDATE_INDREDIENT_LIST';

const addIngredient = (elem) => (dispatch) => {
  elem.type === 'bun' ? dispatch({type: ADD_BUN, elem: {...elem, key: uuidv4()}}) : dispatch({type: ADD_INGREDIENT, elem: {...elem, key: uuidv4()}});
}

const removeIngredient = (elem) => (dispatch) => {
  elem.type === 'bun' ? dispatch({type: REMOVE_BUN}) : dispatch({type: REMOVE_INGREDIENT, elem: elem.key})
}

const updateIngredientsList = () => (dispatch) => {
  dispatch({type: UPDATE_INDREDIENT_LIST});
}

export {addIngredient, removeIngredient, updateIngredientsList};