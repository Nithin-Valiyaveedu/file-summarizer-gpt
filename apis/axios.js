import axios from 'axios';

import { getUserTokenFromLocalStorage } from '@utils/crypto';
import { errorToast } from '@components/toast';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL, // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = getUserTokenFromLocalStorage();
    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
// End of Request interceptor



// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise(function (resolve, reject) {
      if (err.response && err.response.status === 403) {
        localStorage.clear();
        setTimeout(() => {
          window.location.replace("/");
        });
        return false;
      } else if (err.response && err.response.code === 500) {
        console.error("Internal Server Error");
        errorToast(err.response.data?.message)
        window.location.reload();
        return false;
      } else if (err.response && err.response.status === 401) {
        toast.error("Session Timeout");
        localStorage.removeItem("userData");
        setTimeout(() => {
          window.location.replace("/");
        });
        return false;
      }
      else if (err.response.status === 400) {
        errorToast(err.response.data.error.message)
        return false;
      }
      throw err;
    });
  }
);


export default axiosInstance;