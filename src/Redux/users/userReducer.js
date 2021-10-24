import { fetchUsersReq, fetchLoggedInUser, setLoading } from "./userAction";
import {
  FETCH_LOGGED_USER_REQUEST,
  FETCH_USERS_REQUEST,
  SET_LOADING_STATUS,
} from "./userTypes";

const intitialState = {
  allBusinesses: null,
  loggedUser: null,
  loading: false,
  selected: null,
  showPassword: false,
};

const userReducer = (state = intitialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, allBusinesses: action.payload };
    case FETCH_LOGGED_USER_REQUEST:
      return { ...state, loggedUser: action.payload };
    case SET_LOADING_STATUS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export default userReducer;
