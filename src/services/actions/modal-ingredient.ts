import { TIngredientPropType } from "../../utils/prop-types";
import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal-ingredient";

export type TOpenModalAction = {
  readonly type: typeof OPEN_MODAL;
  readonly ingredient: TIngredientPropType;
}

export type TCloseModalAction = {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalAction = TOpenModalAction | TCloseModalAction;


const openModalWithIngredient = (ingredient: TIngredientPropType): TOpenModalAction => ({type: OPEN_MODAL, ingredient: ingredient});

const closeAndCLearModal = (): TCloseModalAction => ({type: CLOSE_MODAL});


export {openModalWithIngredient, closeAndCLearModal}