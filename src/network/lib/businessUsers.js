// import { axiosClient } from "../apiClient";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

const axiosClient = axios.create({
  baseURL: `${URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default axiosClient;
export const getAllBusinessUsers = () => {
  return axiosClient.get("/business");
};

export const getBusinessUser = async (userId, callback) => {
  try {
    const res = axiosClient.get(`/business/${userId}`);
    if (res.ok) {
      const data = await res.json();
      callback(data);
    }
  } catch (error) {
    console.error();
  }
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
