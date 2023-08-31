// Импорты функций запроса к API
import { registerUserRequest, forgotPasswordRequest, resetPasswordRequest, loginUserRequest } from "../../utils/burger-api";
import { saveTokens } from "../../utils/utils";



//------------------------------------------------------------------------



// Экшены 
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const SAVE_USER_PASSWORD = 'SAVE_USER_PASSWORD';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';



// ---------------------------------------------------------------



// Экшен креаторы для функций

const registerUser = (username, email, password) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  registerUserRequest(username, email, password).then(data => {
    dispatch({type: AUTH_SUCCESS});
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
  }).catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  })
}

const forgotPassword = (email) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  forgotPasswordRequest(email).then(() => {
    dispatch({type: AUTH_SUCCESS})
  })
  .catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  });
}

const resetPassword = (password, token) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  resetPasswordRequest(password, token).then(() => {
    dispatch({type: AUTH_SUCCESS});
  })
  .catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  })
}

const loginUser = (email, password) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  loginUserRequest(email, password).then(data => {
    dispatch({type: AUTH_SUCCESS});
    dispatch({type: SAVE_USER_PASSWORD, password: password});
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
  })
  .catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  })
}

export {registerUser, forgotPassword, resetPassword, loginUser}