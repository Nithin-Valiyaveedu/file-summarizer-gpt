import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
);

export const errorToast = (
  message = "something went wrong, Try again later!"
) => toast.error(message);

export const successToast = (message) => toast.success(message);
export const infoToast = (message) => toast.warning(message);
export const deafultToast = (message) => toast(message);
