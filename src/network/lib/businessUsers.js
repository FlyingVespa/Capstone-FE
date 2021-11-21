// import { axiosClient } from "../apiClient";
import axios from "axios"
const URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
    baseURL: `${URL}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  export default axiosClient
export const getAllBusinessUsers = () => {
  return axiosClient.get("/business");
};

export const getBusinessUser = () => {
    return axiosClient.get("/business/:userID")
}

export const registerBusinessUser = (payload) => {
  return axiosClient.post(`/register/business`,  JSON.stringify(payload));
};

export const updateBusinessUser = (payload) => {
    return axiosClient.put(`/business/:userID`, payload)
}

export const deleteBusinessUser = () => {
    return axiosClient.delete(`/business/:userID`)
}