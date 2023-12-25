// Импорты функций запроса к API
import { forgotPasswordRequest, resetPasswordRequest } from "../../utils/burger-api";
import { SEND_CODE_TO_EMAIL_SUCCESS, RESET_PASSWORD_SUCCESS } from "../constants/auth";
import { AppDispatch } from "../types";

export type TSendCodeToEmailSuccessAction = {
  readonly type: typeof SEND_CODE_TO_EMAIL_SUCCESS;
}

export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export type TResetPasswordSendCodeAction = TSendCodeToEmailSuccessAction | TResetPasswordSuccessAction;

// Экшен креаторы для функций

const forgotPassword = (email: string, history: any) => (dispatch: AppDispatch) => {
  forgotPasswordRequest({email}).then(() => {
    dispatch({type: SEND_CODE_TO_EMAIL_SUCCESS})
    // Экшен на успешное направление кода сброса пароля
  })
  .catch(err => {
    // Переадресация на страницу ошибки
    history.push('/error', { errorNumber: err.split(' ')[1]});
  });
}

const resetPassword = (password: string, token: string, history: any) => (dispatch: AppDispatch) => {
  resetPasswordRequest({password, token}).then(() => {
    dispatch({type: RESET_PASSWORD_SUCCESS});
    // экшен на успешный сброс.
  })
  .catch(err => {
    // Переадресация на страницу ошибки.
    history.replace('/error', { errorNumber: err.split(' ')[1]});
  })
}


export { forgotPassword, resetPassword}