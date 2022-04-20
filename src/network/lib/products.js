import Swal from "sweetalert2";
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

export const updateProduct = async (userId, productId, formData) => {
  try {
    let res = await axios.put(
      `${URL}/business/${userId}/products/${productId}`,
      formData,
      { new: true }
    );

    let data = await res.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// Not used - to impplement
export const getUserProducts = async (userId, callback, loading) => {
  loading(false);
  try {
    let res = await axios.get(`${URL}/business/${userId}/products`);
    let userData = await res.data;
    callback(userData);
    loading(true);
    console.log(userData);
  } catch (error) {
    console.log(error);
    loading(false);
  }
};
// export const updateProduct = async (userId, formData) => {
//   var requestOptions = {
//     method: "PATCH",
//     body: formData,
//     redirect: "follow",
//   };

//   fetch(
//     `${URL}/business/${userId}/products/${formData.id}`,
//     formData,
//     requestOptions
//   )
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));
// };

export const addProduct = async (userId, formData, fetchData) => {
  try {
    let res = await axios.post(`${URL}/business/${userId}/products`, formData);
    let data = await res.data;
    console.log(data);
    setTimeout(() => fetchData(), 1000);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (businessId, dataid, callback) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      try {
        axios
          .delete(`${URL}/business/${businessId}/products/${dataid}`)
          .then((res) => {
            if (res.status == 204) {
              console.log("deleted");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .then(setTimeout(() => callback(), 1000))
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        Swal.fire("Error!", "Could not delete Item.", "Error");
      }
    }
  });
};
