import Swal from "sweetalert2";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

// 1. GET product
// 2. POST/ PUT
//3. DELETE

export const getProductData = async (userId, setRowData) => {
  try {
    const res = await axios.get(`${URL}/business/${userId}/products`);
    let data = await res.data;
    setRowData(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (userId, formData) => {
  if (formData.id) {
    try {
      let res = await axios.put(
        `${URL}/business/${userId}/products/${formData.id}`,
        formData
      );

      let data = await res.data;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Successfully Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Could not update product, please try again",
        showConfirmButton: false,
        timer: 3500,
      });
    }
  } else {
    console.log(` data does not contain id`);
  }
};
export const addProduct = async (userId, formData, handleSuccess) => {
  try {
    let res = await axios.post(`${URL}/business/${userId}/products`, formData);
    let data = await res.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = (userId, data, setRowData) => {
  axios
    .delete(`${URL}/business/${userId}/products/${data.id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};
