export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CHOOSE_INGREDIENT = 'CHOOSE_INGREDIENT';
export const CLEAR_MODAL_WINDOW = 'CLEAR_MODAL_WINDOW';

const openModalWithIngredient = (ingredient) => (dispatch) => {
  dispatch({type: OPEN_MODAL});
  dispatch({type: CHOOSE_INGREDIENT, ingredient: ingredient})
}

const closeAndCLearModal = () => (dispatch) => {
  dispatch({type: CLOSE_MODAL});
  dispatch({type: CLEAR_MODAL_WINDOW});
}

export {openModalWithIngredient, closeAndCLearModal}