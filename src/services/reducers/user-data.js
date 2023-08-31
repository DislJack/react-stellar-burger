import { GET_USER_DATA_REQUEST, GET_USER_DATA_SUCCESS, GET_USER_DATA_FAILED, UPDATE_USER_DATA_REQUEST, UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_FAILED } from "../actions/user-data";

const initialUserData = {
  isLoading: false,
  hasError: false,
  user: {}
}

function getUserDataReducer(userData = initialUserData, action) {
  switch (action.type) {
    case GET_USER_DATA_REQUEST: {
      return {
        ...userData,
        isLoading: true
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...userData,
        isLoading: false,
        user: action.user
      }
    }
    case GET_USER_DATA_FAILED: {
      return {
        ...userData,
        isLoading: false,
        hasError: true
      }
    }
    case UPDATE_USER_DATA_REQUEST: {
      return {
        ...userData,
        isLoading: true
      }
    }
    case UPDATE_USER_DATA_SUCCESS: {
      return {
        ...userData,
        isLoading: false,
        user: action.user
      }
    }
    case UPDATE_USER_DATA_FAILED: {
      return {
        ...userData,
        isLoading: false,
        hasError: true
      }
    }
    default: return userData;
  }
}

export default getUserDataReducer;