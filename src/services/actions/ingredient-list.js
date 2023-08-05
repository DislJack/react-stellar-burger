import { getDataRequest } from "../../utils/burger-api";
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILURE = 'GET_INGREDIENTS_FAILURE';

const getData = () => (dispatch) => {
  dispatch({type: GET_INGREDIENTS_REQUEST});
  getDataRequest()
    .then(data => dispatch({type: GET_INGREDIENTS_SUCCESS, elem: data.data}))
    .catch(err => {
      dispatch({type: GET_INGREDIENTS_FAILURE});
      console.log(`Произошла ошибка №${err}`)
    });
}

export default getData