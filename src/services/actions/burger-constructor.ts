import {v4 as uuidv4} from 'uuid';
import { ADD_BUN, ADD_INGREDIENT, REMOVE_BUN, REMOVE_INGREDIENT, UPDATE_INDREDIENT_LIST } from '../constants/burger-constructor';
import { TIngredientPropType } from '../../utils/prop-types';

export type TAddIngredientAction = {
  readonly type: typeof ADD_BUN | typeof ADD_INGREDIENT;
  readonly elem: {bun: string; ingredients: string[]; key: string}
}

export type TRemoveIngredientAction = {
  readonly type: typeof REMOVE_BUN | typeof REMOVE_INGREDIENT;
  readonly elem: string;
}

export type TUpgradeIngredientListAction = {
  readonly type: typeof UPDATE_INDREDIENT_LIST;
}

export type TIngredientAction = TAddIngredientAction | TRemoveIngredientAction | TUpgradeIngredientListAction


const addIngredient = (elem: TIngredientPropType) => {
  return elem.type === 'bun' ? {type: ADD_BUN, elem: {...elem, key: uuidv4()}} : {type: ADD_INGREDIENT, elem: {...elem, key: uuidv4()}}
}

const removeIngredient = (elem: TIngredientPropType) => {
  return elem.type === 'bun' ? {type: REMOVE_BUN} : {type: REMOVE_INGREDIENT, elem: elem.key}
}

const updateIngredientsList = () => ({type: UPDATE_INDREDIENT_LIST})

export {addIngredient, removeIngredient, updateIngredientsList};