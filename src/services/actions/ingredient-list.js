import { getDataRequest } from "../../utils/burger-api";
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const IS_LOADING = 'IS_LOADING';
export const HAS_ERROR = 'HAS_ERROR';

const getData = () => (dispatch) => {
  dispatch({type: IS_LOADING});
  getDataRequest()
    .then(data => dispatch({type: GET_INGREDIENTS, elem: data.data}))
    .catch(err => {
      dispatch({type: HAS_ERROR});
      console.log(`Произошла ошибка №${err}`)
    });
}

export default getData