import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// var navigate = useNavigate;

export const notifySwal = (message, status) => {
  Swal.fire({
    position: "top-end",
    icon: status,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const confirmSwal = () =>
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

export const timerSuccess = (navigate, path) => {
  let timerInterval;

  Swal.fire({
    title: "Login Success!",
    html: "Preping details in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  })
    .then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    })
    .then(() => navigate(path));
};
