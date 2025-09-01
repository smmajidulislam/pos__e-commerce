import Swal from "sweetalert2";

const MySuccessSawal = (isButton = false, timer = null) =>
  Swal.fire({
    title: "Done",
    text: "Your Request is Done",
    icon: "success",
    showCancelButton: isButton,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    timer,
    timerProgressBar: !!timer,
  });

const MyErrorSawal = (isButton = false, timer = null, text) =>
  Swal.fire({
    title: "Error",
    text: text,
    icon: "error",
    showCancelButton: isButton,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    timer,
    timerProgressBar: !!timer,
  });

export { MySuccessSawal, MyErrorSawal };
