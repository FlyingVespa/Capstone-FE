import Swal from "sweetalert2";
import { axiosClient } from "../axiosClient";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

// 1. GET product
// 2. POST/ PUT
//3. DELETE

export const getProductData = async (userId, callback) => {
  try {
    const res = await axios.get(`${URL}/business/${userId}/products`);
    let data = await res.data;
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const addUpdateProduct = async (userId, data, setRowData) => {
  if (data.id) {
    axiosClient
      .put(`/business/${userId}/products/${data.id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .then(getProductData(userId, setRowData))
      .then(
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Successfully Added",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Could not add product, please try again",
          showConfirmButton: false,
          timer: 3500,
        })
      );
  } else {
    axiosClient
      .post(`/business/${userId}/products`, data)
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
      .then(getProductData(userId, setRowData))
      .then(
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Successfully Added",
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Could not add product, please try again",
          showConfirmButton: false,
          timer: 3500,
        })
      );
  }
};

export const deleteProduct = (data, userId, setRowData) => {
  axios
    .delete(`${URL}/business/me/products/${data.id}`)
    .then((res) => {
      console.log(res);
    })
    .then(getProductData(userId, setRowData))
    .catch((error) => {
      console.log(error);
    });
};

export const uploadProductImage = (formData, userId) => {
  if (formData.id) {
    axiosClient
      .post(`/business/${userId}/products/${formData.id}/uploadimage`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
