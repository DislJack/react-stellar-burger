import { SET_USER, SET_AUTH_CHECKED } from "../constants/user-data";
import { TUserAction } from "../actions/user-data";

type TInitialUserData = {
  user: {
    email: string;
    name: string;
  };
  isUserLoaded: boolean;
}

const initialUserData: TInitialUserData = {
  user: {
    email: '',
    name: ''
  },
  isUserLoaded: false
}

function getUserDataReducer(userData = initialUserData, action: TUserAction) {
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