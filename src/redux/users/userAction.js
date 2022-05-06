import axios from "axios";
import {
  FETCH_LOGGED_USER_REQUEST,
  FETCH_LOGGED_USER_SUCCESS,
  FETCH_LOGGED_USER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./userTypes";

import { useDispatch } from "react-redux";
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
export const fetchLoggedUserReq = () => {
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
// *********************************************///

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersReq);
    axios
      .get(`${URL}/business`)
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

export const fetchLoggedInUser = (userId) => {
  return (dispatch) => {
    dispatch(fetchLoggedUserReq);
    axios
      .get(`${URL}/business/${userId}`)
      .then((res) => {
        dispatch(fetchLoggedUserSuccess(res.data));
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(error);
        dispatch(fetchLoggedUserFailure(errorMsg));
      });
  };
};

// export const fetchLoggedInClient = () => {

//     fetchLoggedUserReq();
//     axios
//       .get(`${URL}/profile/me`)
//       .then((res) => {
//         dispatch(fetchLoggedUserSuccess(res.data));
//       })
//       .catch((error) => {
//         dispatch(fetchLoggedUserFailure(error.message));
//         console.log(error);
//       });
//   };

export const fetchLoggedInClient = () => {
  return async (dispatch) => {
    dispatch(fetchLoggedUserReq());
    try {
      const response = await axios.get(`${URL}/profile/me`, {
        withCredentials: true,
      });
      let loggedUser = await response.data;
      await dispatch(fetchLoggedUserSuccess(loggedUser));
      console.log("fetch logged", loggedUser);
    } catch (error) {
      dispatch(fetchLoggedUserFailure(error.message));
      console.log(error);
    }
  };
};
