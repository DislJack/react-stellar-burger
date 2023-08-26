// Импорты функций запроса к API
import { registerUserRequest, forgotPasswordRequest, resetPasswordRequest, loginUserRequest } from "../../utils/burger-api";
import { saveTokens, navigate } from "../../utils/utils";



//------------------------------------------------------------------------



// Экшены 
export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';



// ---------------------------------------------------------------



// Экшен креаторы для функций

const registerUser = (username, email, password) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  registerUserRequest(username, email, password).then(data => {
    dispatch({type: AUTH_SUCCESS});
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    navigate('/');
  }).catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  })
}

const forgotPassword = (email) => (dispatch) => {
  dispatch({type: AUTH_REQUEST});
  forgotPasswordRequest(email).then(() => {
    dispatch({type: AUTH_SUCCESS})
    navigate('/reset-password');
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
    navigate('/login');
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
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    navigate('/');
  })
  .catch(err => {
    dispatch({type: AUTH_FAILED});
    console.log(err);
  })
}

export {registerUser, forgotPassword, resetPassword, loginUser}