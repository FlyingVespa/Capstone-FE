import Swal from "sweetalert2";
import { axiosClient } from "../axiosClient";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

// 1. GET product
// 2. POST/ PUT
//3. DELETE

export const getProductData = async (userId, callback, setLoading) => {
 
  try {
    const res = await axios.get(`${URL}/business/${userId}/products`);
    if (res.ok) {
      let data = await res.json();
      callback(data);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    await setLoading(false);
  }
};

export const addUpdateProduct = async (formData, userId) => {
  if (formData.id) {
    axiosClient
      .put(`/business/${userId}/products/${formData.id}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axiosClient
      .post(`/business/${userId}/products`, formData)
      .then((res) => {
        console.log(JSON.stringify(res.data));
      })
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

export const deleteProduct = (formData, userId, file) => {
  if (formData.id) {
    axiosClient
      .delete(`/business/${userId}/products/${formData.id}`, file)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        getProductData();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log("NO id for product - delete function");
  }
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
