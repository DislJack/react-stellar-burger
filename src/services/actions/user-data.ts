import { authUser, logoutUserRequest, refreshTokenUser, updateUserDataRequest, loginUserRequest, registerUserRequest } from "../../utils/burger-api";
import { saveTokens } from "../../utils/utils";
import { SET_USER, SET_AUTH_CHECKED } from "../constants/user-data";
import { AppDispatch } from "../types";

export type TSetUserAction = {
  readonly type: typeof SET_USER;
  readonly user?: {
    email?: string;
    name?: string;
  }
}

export type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
}

export type TUserAction = TSetUserAction | TSetAuthCheckedAction;


// utils error function
function throwError(err: string, history: any) {
  history.replace('/error', { errorNumber: err.split(' ')[1]});
}

const updateUserData = (username: string, email: string, password: string, history: any) => (dispatch: AppDispatch) => {
  updateUserDataRequest(username, email, password).then(data => {
    dispatch({type: SET_USER, user: data.user});
  }).catch((err) => {
    console.log(err);
    if (err.message === 'jwt expired') {
      refreshTokenUser().then(data => {
        saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
        updateUserDataRequest(username, email, password).then(data => {
          dispatch({type: SET_USER, user: data.user});
        });
      }).catch(() => {
        localStorage.clear();
        // Переадресация на страницу Логина
        history.push('/login');
      });
    } else {
      // Переадресация на страницу ошибки
      throwError(err, history);
    }
  })
}

const checkUserAuth = (history: any) => (dispatch: AppDispatch) => {
  if (localStorage.getItem('accessToken')) {
    authUser().then(data => {
      dispatch({type: SET_USER, user: data.user})
    }).catch((err) => {
      if (err.message === 'jwt expired') {
        refreshTokenUser().then(data => {
          saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
          authUser().then(data => {
            dispatch({type: SET_USER, user: data.user})
          }).catch(err => {
            throwError(err, history);
          })
        }).catch(err => {
          throwError(err, history);
        })
      } else {
        localStorage.clear();
        dispatch({type: SET_USER, user: {}});
      }
    }).finally(() => {
      dispatch({type: SET_AUTH_CHECKED});
    })
  } else {
    dispatch({type: SET_AUTH_CHECKED});
  }
}



const registerUser = (username: string, email: string, password: string, history: any) => (dispatch: AppDispatch) => {
  registerUserRequest(username, email, password).then(data => {
    dispatch({type: SET_USER, user: data.user})
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    history.replace('/');
  }).catch(err => {
    // переадресация на страницу ошибки
    throwError(err, history);
  })
}

const loginUser = (email: string, password: string, history: any) => (dispatch: AppDispatch) => {
  loginUserRequest(email, password).then(data => {
    dispatch({type: SET_USER, user: data.user});
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    history.replace('/');
  })
  .catch(err => {
    // Переадресация на страницу ошибки
    throwError(err, history);
  })
}

const logoutUser = (history: any) => (dispatch: AppDispatch) => {
  logoutUserRequest().then(() => {
    history.replace('/login');
  }).catch(err => {
    // Переадресация на страницу ошибки
    throwError(err, history);
  }).finally(() => {
    dispatch({type: SET_USER, user: undefined})
    localStorage.clear();
  })
}

export {checkUserAuth, registerUser, loginUser, logoutUser, updateUserData};