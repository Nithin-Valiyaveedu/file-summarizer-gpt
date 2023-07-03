import axiosInstance from "../axios";

const addProject = payload => axiosInstance.post("/project/add-project", payload);
const uploadProjectFiles = (payload) => axiosInstance.post("/common/file-upload", payload);

export const projectApis = {
  addProject,
  uploadProjectFiles
};