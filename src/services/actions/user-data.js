import { authUser, logoutUserRequest, refreshTokenUser, updateUserDataRequest, loginUserRequest, registerUserRequest } from "../../utils/burger-api";
import { saveTokens } from "../../utils/utils";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';


/* const getUserData = () => (dispatch) => {
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
  })
} */

/* function updateUserInfo() */

// utils error function
function throwError(err, history) {
  history.replace('/error', { errorNumber: err.split(' ')[1]});
}

const updateUserData = (name, email, password, history) => (dispatch) => {
  updateUserDataRequest(name, email, password).then(data => {
    dispatch({type: SET_USER, user: data.user});
  }).catch((err) => {
    console.log(err);
    if (err.message === 'jwt expired') {
      refreshTokenUser().then(data => {
        saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
        updateUserDataRequest(name, email, password).then(data => {
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

const checkUserAuth = (history) => (dispatch) => {
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



const registerUser = (username, email, password, history) => (dispatch) => {
  registerUserRequest(username, email, password).then(data => {
    dispatch({type: SET_USER, user: data.user})
    saveTokens(data.accessToken.split(' ')[1], data.refreshToken);
    history.replace('/');
  }).catch(err => {
    // переадресация на страницу ошибки
    throwError(err, history);
  })
}

const loginUser = (email, password, history) => (dispatch) => {
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

const logoutUser = (history) => (dispatch) => {
  logoutUserRequest().then(() => {
    history.replace('/login');
  }).catch(err => {
    // Переадресация на страницу ошибки
    throwError(err, history);
  }).finally(() => {
    dispatch({type: SET_USER, user: {}})
    localStorage.clear();
  })
}

export {checkUserAuth, registerUser, loginUser, logoutUser, updateUserData};