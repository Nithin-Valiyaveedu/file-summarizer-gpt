import axiosInstance from "../axios";

const addProject = payload => axiosInstance.post("/project/add-project", payload);
const uploadProjectFiles = (payload) => axiosInstance.post("/common/file-upload", payload);
const viewProjects = () => axiosInstance.get("/project/get-my-projects");
const deleteProject = (projectId) => axiosInstance.delete(`/project/delete-project/${projectId}`);

export const projectApis = {
  addProject,
  uploadProjectFiles,
  viewProjects,
  deleteProject
};