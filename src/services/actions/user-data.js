import { authUser, refreshTokenUser, updateUserDataRequest } from "../../utils/burger-api";
import { saveTokens } from "../../utils/utils";

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED = 'UPDATE_USER_DATA_FAILED';

const getUserData = () => async (dispatch) => {
  dispatch({type: GET_USER_DATA_REQUEST});
  await authUser().then(data => {
    dispatch({type: GET_USER_DATA_SUCCESS, user: data.user});
  }).catch(err => {
    if (err.message === 'jwt expired') {
      refreshTokenUser().then(data => {
        saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
        authUser().then(data => {
          dispatch({type: GET_USER_DATA_SUCCESS, user: data.user});
        }).catch(err => {
          dispatch({type: GET_USER_DATA_FAILED});
          return Promise.reject(err);
        })
      });
    }
  })
}

const updateUserData = (name, email, password) => (dispatch) => {
  dispatch({type: UPDATE_USER_DATA_REQUEST});
  updateUserDataRequest(name, email, password).then(data => {
    dispatch({type: UPDATE_USER_DATA_SUCCESS, user: data.user});
  }).catch(() => {
    refreshTokenUser().then(data => {
      saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
      updateUserDataRequest(name, email, password).then(data => {
        dispatch({type: UPDATE_USER_DATA_SUCCESS, user: data.user});
      }).catch(err => {
        dispatch({type: UPDATE_USER_DATA_FAILED});
        return Promise.reject(err);
      })
    }).catch(() => {
      localStorage.clear();
      dispatch({type: GET_USER_DATA_FAILED});
    });
  })
}

export {getUserData, updateUserData};