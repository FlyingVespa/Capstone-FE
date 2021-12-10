import axiosClient from "../axiosClient";
import axios from "axios";
import {useDispatch} from "react-redux";
import * as userAction from "../../redux/users/userAction.js";
const URL = process.env.REACT_APP_API_URL;
export default axiosClient;
export const getAllBusinessUsers = () => {
  return axiosClient.get("/business");
};

// let dispatch = useDispatch()
// export const getBusinessUser = (userId, callback) => {
//   try {
//     axios
//       .get(`${URL}/business/${userId}`, { withCredentials: true })
//       .then((result) => {
//         callback(result.data);
//       })

//   } catch (error) {
//     console.error();
//   }
// };
export const getBusinessUser = (userId, callback) => {
  // return (dispatch) => {
  //   dispatch(userAction.fetchLoggedUser);
    axios
      .get(`${URL}/business/${userId}`, {withCredentials: true})
      .then((res) => {
        const userData = res.data
        callback(userData);
        console.log(userData);
        // useDispatch(userAction.currentUserDetails(userData))
        // dispatch(userAction.fetchLoggedUserSuccess(userData));
        // dispatch(userAction.currentUserDetails(userData));
      })

      .catch((error) => {
        const errorMsg = error.message;
        console.log(error);
        // dispatch(userAction.fetchLoggedUserFailure(errorMsg));
      });
  };
// };

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(userAction.fetchUsersReq);

    axios
      .get(`${URL}/business`)
      .then((res) => {
        const usersData = res.data;
        dispatch(userAction.fetchUsersSuccess(usersData));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(userAction.fetchUsersFailure(errorMsg));
      });
  };
};

export const registerBusinessUser = (payload) => {
  return axiosClient.post(`/register/business`, JSON.stringify(payload));
};

export const updateBusinessUser = (userId, payload) => {
  return axiosClient.put(`/business/${userId}`, payload);
};

export const deleteBusinessUser = (userId) => {
  return axiosClient.delete(`/business/${userId}`);
};
