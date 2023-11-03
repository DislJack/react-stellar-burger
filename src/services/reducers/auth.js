import { SEND_CODE_TO_EMAIL_SUCCESS, RESET_PASSWORD_SUCCESS } from "../actions/auth";

const initialAuth = {
  emailSent: false,
  passwordReset: false
}

function authReducer(auth = initialAuth, action) {
  switch (action.type) {
    case SEND_CODE_TO_EMAIL_SUCCESS: {
      return {
        ...auth,
        emailSent: true
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...auth,
        emailSent: false,
        passwordReset: true
      }
    }
    default: return auth
  }
}

export default authReducer;