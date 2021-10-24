import {
  FETCH_LOGGED_USER_REQUEST,
  FETCH_USERS_REQUEST,
  SET_LOADING_STATUS,
} from "./userTypes";

export const fetchUsersReq = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fetchLoggedInUser = () => {
  return {
    type: FETCH_LOGGED_USER_REQUEST,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING_STATUS,
  };
};
