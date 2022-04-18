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

export const updateProduct = async (userId, formData) => {
  try {
    let res = await axios.patch(
      `${URL}/business/${userId}/products/${formData.id}`,
      formData
    );
    let data = await res.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getUserProducts = async (userId, callback) => {
  axios
    .get(`${URL}/business/${userId}/products`)
    .then((res) => {
      const userData = res.data;
      callback(userData);
      console.log(userData);
    })
    .catch((error) => {
      const errorMsg = error.message;
      console.log(errorMsg);
    });
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

export const addProduct = async (userId, formData) => {
  try {
    let res = await axios.post(`${URL}/business/${userId}/products`, formData);
    let data = await res.data;
    console.log(data);
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
