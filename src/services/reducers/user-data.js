import { SET_USER, SET_AUTH_CHECKED } from "../actions/user-data";

const initialUserData = {
  user: {},
  isUserLoaded: false
}

function getUserDataReducer(userData = initialUserData, action) {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return {
        ...userData,
        isUserLoaded: true
      }
    }
    case SET_USER: {
      return {
        ...userData,
        user: action.user
      }
    }
    default: return userData;
  }
}

export default getUserDataReducer;