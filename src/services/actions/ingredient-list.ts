import { getDataRequest } from "../../utils/burger-api";
import { TIngredientPropType } from "../../utils/prop-types";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILURE } from "../constants/ingredient-list";
import { AppDispatch } from "../types";

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly elem: Array<TIngredientPropType>;
}

export type TGetIngredientsFailureAction = {
  readonly type: typeof GET_INGREDIENTS_FAILURE;
}

export type TGetIngredientsAction = TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailureAction;

const getData = () => (dispatch: AppDispatch) => {
  dispatch({type: GET_INGREDIENTS_REQUEST});
  getDataRequest()
    .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, elem: data.data}))
    .catch(err => {
      dispatch({type: GET_INGREDIENTS_FAILURE});
      console.log(`Произошла ошибка №${err}`)
    });
}

export default getData