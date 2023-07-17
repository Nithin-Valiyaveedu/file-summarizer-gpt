import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      limit={1}
      hideProgressBar={false}
      newestOnTop={true}
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
  message = "Something went wrong, Try again later!"
) => {
  toast.error(message);
  toast.clearWaitingQueue()
}
export const successToast = (message) => {
  toast.success(message)
  toast.clearWaitingQueue()
}
export const infoToast = (message) => toast.warning(message);
