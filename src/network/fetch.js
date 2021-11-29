import axios from "axios";
import Swal from "sweetalert2";

export const handleFormSubmit = async (
  formData,
  userId,
  getProductData,
  handleClose
) => {
  if (formData.id) {
    axios
      .put(`${URL}/business/${userId}/products/${formData.id}`, formData)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        getProductData();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .post(`${URL}/business/${userId}/products`, formData)
      .then((res) => {
        console.log(JSON.stringify(res.data));
        getProductData();
        handleClose();
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
      .catch(
        (error) =>
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Could not add product, please try again",
            showConfirmButton: false,
            timer: 3500,
          }) && handleClose()
      );
  }
};
