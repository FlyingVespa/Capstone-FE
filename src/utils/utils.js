import Axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export const logoutUser = async () => {
  return new Promise((resolve, reject) => {
    Axios.get(`${URL}/auth/logout`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("success");
          resolve();
        }
      })
      .catch((error) => reject(error));
  });
};
