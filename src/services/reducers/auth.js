import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, SAVE_USER_PASSWORD, AUTH_LOGOUT } from "../actions/auth";

const initialAuth = {
  isLoading: false,
  hasError: false,
  isUserLoaded: false,
  password: ''
}

function authReducer(auth = initialAuth, action) {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...auth,
        isLoading: true,
        hasError: false
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...auth,
        isLoading: false,
        isUserLoaded: true
      }
    }
    case AUTH_FAILED: {
      return {
        ...auth,
        isLoading: false,
        hasError: true
      }
    }
    case SAVE_USER_PASSWORD: {
      return {
        ...auth,
        password: action.password
      }
    }
    case AUTH_LOGOUT: {
      return {
        ...auth,
        isUserLoaded: false,
        password: ''
      }
    }
    default: return auth
  }
}

export default authReducer;