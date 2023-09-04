import { authUser, logoutUserRequest, refreshTokenUser, updateUserDataRequest, loginUserRequest, registerUserRequest } from "../../utils/burger-api";
import { saveTokens } from "../../utils/utils";

export const GET_USER_DATA = 'GET_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';


const getUserData = (history) => (dispatch) => {
  authUser().then(data => {
    dispatch({type: GET_USER_DATA, user: data.user});
  }).catch(err => {
    if (err.message === 'jwt expired') {
      refreshTokenUser().then(data => {
        saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
        authUser().then(data => {
          dispatch({type: GET_USER_DATA, user: data.user});
        }).catch(err => {
          return Promise.reject(err);
        });
      });
    }
    history.replace('/login');
  })
}

const updateUserData = (name, email, password, history) => (dispatch) => {
  updateUserDataRequest(name, email, password).then(data => {
    dispatch({type: UPDATE_USER_DATA, user: data.user});
  }).catch((err) => {
    if (err.message === 'jwt expired') {
      refreshTokenUser().then(data => {
        saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
        updateUserDataRequest(name, email, password).then(data => {
          dispatch({type: UPDATE_USER_DATA, user: data.user});
        });
      }).catch(() => {
        localStorage.clear();
        // Переадресация на страницу Логина
        history.push('/login');
      });
    } else {
      // Переадресация на страницу ошибки
      throwError(err, history)
      return Promise.reject(err);
    }
  })
}


// utils error function
function throwError(err, history) {
  history.replace('/error', { errorNumber: err.split(' ')[1]});
}


const registerUser = (username, email, password, history) => (dispatch) => {
  registerUserRequest(username, email, password).then(data => {
    dispatch({type: REGISTER_USER_SUCCESS, user: data.user})
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    history.replace('/');
  }).catch(err => {
    // переадресация на страницу ошибки
    throwError(err, history);
  })
}

const loginUser = (email, password, history) => (dispatch) => {
  loginUserRequest(email, password).then(data => {
    dispatch({LOGIN_SUCCESS, user: data.user})
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    history.replace('/');
  })
  .catch(err => {
    // Переадресация на страницу ошибки
    throwError(err, history);
  })
}

const logoutUser = (history) => (dispatch) => {
  logoutUserRequest().then(() => {
    history.replace('/login');
  }).catch(err => {
    // Переадресация на страницу ошибки
    throwError(err, history);
  }).finally(() => {
    dispatch({LOGOUT_SUCCESS})
    localStorage.clear();
  })
}

export {getUserData, updateUserData, registerUser, loginUser, logoutUser};