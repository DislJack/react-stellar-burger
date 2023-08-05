export const selectIngredientList = store => store.state.data;

export const selectBurger = store => store.burger;

export const selectModal = store => ({
  open: store.modal.open,
  ingredient: store.modal.ingredient
});

export const selectOrderNumber = store => store.order.number;