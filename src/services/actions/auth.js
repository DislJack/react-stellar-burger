// Импорты функций запроса к API
import { forgotPasswordRequest, resetPasswordRequest } from "../../utils/burger-api";




//------------------------------------------------------------------------



// Экшены 

export const SEND_CODE_TO_EMAIL_SUCCESS = 'SEND_CODE_TO_EMAIL_SUCCESS';

export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';





// ---------------------------------------------------------------



// Экшен креаторы для функций

const forgotPassword = (email, history) => (dispatch) => {
  forgotPasswordRequest(email).then(() => {
    dispatch({type: SEND_CODE_TO_EMAIL_SUCCESS})
    // Экшен на успешное направление кода сброса пароля
  })
  .catch(err => {
    // Переадресация на страницу ошибки
    history.push('/error', { errorNumber: err.split(' ')[1]});
  });
}

const resetPassword = (password, token, history) => (dispatch) => {
  resetPasswordRequest(password, token).then(() => {
    dispatch({type: RESET_PASSWORD_SUCCESS});
    // экшен на успешный сброс.
  })
  .catch(err => {
    // Переадресация на страницу ошибки.
    history.replace('/error', { errorNumber: err.split(' ')[1]});
  })
}


export { forgotPassword, resetPassword}