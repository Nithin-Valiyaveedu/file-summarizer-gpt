import axiosInstance from "../axios";

const googleAuth = payload => axiosInstance.post("/auth/google-login", payload);

export const authenticationApi = {
  googleAuth,
};