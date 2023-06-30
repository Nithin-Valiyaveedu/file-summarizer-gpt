import axiosInstance from "../axios";

const googleAuth = payload => axiosInstance.post("/auth/google-login", payload);
const logout = () => axiosInstance.post("/auth/logout");

export const authenticationApi = {
  googleAuth,
  logout
};