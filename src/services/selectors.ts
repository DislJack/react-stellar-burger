import { TIngredientPropType } from "../utils/prop-types";

export const selectIngredientList = (store: {state: {data: {buns: Array<TIngredientPropType>; sauces: Array<TIngredientPropType>; main: Array<TIngredientPropType>}}}) => store.state.data;

export const selectBurger = (store: {burger: {bun: TIngredientPropType; ingredients: Array<TIngredientPropType>}}) => store.burger;

export const selectModal = (store: {modal: {open: boolean; ingredient?: TIngredientPropType | 'submit'}}) => ({
  open: store.modal.open,
  ingredient: store.modal.ingredient
});

export const selectOrderNumber = (store: {order: {number: number}}) => store.order.number;