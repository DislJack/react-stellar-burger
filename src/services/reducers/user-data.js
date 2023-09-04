import { GET_USER_DATA, UPDATE_USER_DATA, REGISTER_USER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/user-data";

const initialUserData = {
  user: {},
  isUserLoaded: false
}

function getUserDataReducer(userData = initialUserData, action) {
  switch (action.type) {
    case GET_USER_DATA: {
      return {
        ...userData,
        user: action.user,
        isUserLoaded: true
      }
    }
    case UPDATE_USER_DATA: {
      return {
        ...userData,
        user: action.user,
        isUserLoaded: true
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...userData,
        user: action.user,
        isUserLoaded: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...userData,
        user: action.user,
        isUserLoaded: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...userData,
        user: {},
        isUserLoaded: false
      }
    }
    default: return userData;
  }
}

export default getUserDataReducer;