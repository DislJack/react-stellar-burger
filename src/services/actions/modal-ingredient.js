export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const openModalWithIngredient = (ingredient) => ({type: OPEN_MODAL, ingredient: ingredient});

const closeAndCLearModal = () => ({type: CLOSE_MODAL});


export {openModalWithIngredient, closeAndCLearModal}