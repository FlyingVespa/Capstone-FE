import axios from "axios";
import {
  FETCH_LOGGED_USER_REQUEST,
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_LOGGED_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  CURRENT_USER_DETAILS,
} from "./userTypes";

const URL = process.env.REACT_APP_API_URL;

//ALL USERS *********************************//
export const fetchUsersReq = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

// SINGLE USER *******************************//
export const fetchLoggedUser = () => {
  return {
    type: FETCH_LOGGED_USER_REQUEST,
  };
};
export const fetchLoggedUserSuccess = (user) => {
  return {
    type: FETCH_LOGGED_USER_SUCCESS,
    payload: user,
  };
};
export const fetchLoggedUserFailure = (error) => {
  return {
    type: FETCH_LOGGED_USER_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersReq);

    axios
      .get(`${URL}/business`)
      .then((res) => {
        const usersData = res.data;
        dispatch(fetchUsersSuccess(usersData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
      });
  };
};

export const fetchLoggedInUser = (userId, callback) => {
  return (dispatch) => {
    dispatch(fetchLoggedUser);
    axios
      .get(`${URL}/business/${userId}`)
      .then((res) => {
        const userData = res.data;
        callback(userData);
        dispatch(fetchLoggedUserSuccess(userData));
        dispatch(currentUserDetails(userData));
      })

      .catch((error) => {
        const errorMsg = error.message;
        console.log(error);
        dispatch(fetchLoggedUserFailure(errorMsg));
      });
  };
};
export const currentUserDetails = (payload) => {
  return {
    type: CURRENT_USER_DETAILS,
    payload: payload,
  };
};
