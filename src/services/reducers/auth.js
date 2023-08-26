import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED } from "../actions/auth";

const initialAuth = {
  isLoading: false,
  hasError: false
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
        isLoading: false
      }
    }
    case AUTH_FAILED: {
      return {
        ...auth,
        isLoading: false,
        hasError: true
      }
    }
    default: return auth
  }
}

export default authReducer;