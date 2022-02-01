import axiosClient from "../axiosClient";
import axios from "axios";
import * as userAction from "../../redux/users/userAction.js";
const URL = process.env.REACT_APP_API_URL;

export const getAllBusinessUsers = () => {
  return axiosClient.get("/business");
};

// let dispatch = useDispatch();
export const getBusinessUser = (userId, callback) => {
  try {
    axios
      .get(`${URL}/business/${userId}`, { withCredentials: true })
      .then((result) => {
        callback(result.data);
      });
  } catch (error) {
    console.error();
  }
};
// export const getBusinessUser = (userId, callback, setLoading) => {
//   setLoading(true);
//   axios
//     .get(`${URL}/business/${userId}`, { withCredentials: true })
//     .then((res) => {
//       const userData = res.data;
//       callback(userData);
//       setLoading(false);
//       //
//       console.log("Logged from businessUser.js :", userData);
//     })
//     .catch((error) => {
//       const errorMsg = error.message;
//       console.log(errorMsg);
//     });
// };
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
