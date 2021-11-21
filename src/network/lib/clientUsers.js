import { axiosClient } from "../apiClient";


export const getClient = (req, res) => {
    return axiosClient.get("/profile/:userID")
}

export const registerClient = () => {
  return axiosClient.post(`/register/client`);
};

export const updateClientDetails = () => {
    return axiosClient.put(`/profile/:userID`)
}

export const deleteClient = () => {
    return axiosClient.delete(`/profile/:userID`)
}

