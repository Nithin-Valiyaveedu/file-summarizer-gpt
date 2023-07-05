import axiosInstance from "../axios";

const addProject = payload => axiosInstance.post("/project/add-project", payload);
const uploadProjectFiles = (payload) => axiosInstance.post("/common/file-upload", payload);
const viewProjects = () => axiosInstance.get("/project/get-my-projects");
const deleteProject = (projectId) => axiosInstance.delete(`/project/delete-project/${projectId}`);
const getProjectDetails = (projectId) => axiosInstance.get(`/project/get-project-details/${projectId}`);
const addProjectFiles = (payload, projectId) => axiosInstance.post(`/project/add-project-files/${projectId}`, payload);
const delteProjectFiles = (fileId) => axiosInstance.delete(`/project/delete-project-file/${fileId}`);

export const projectApis = {
  addProject,
  uploadProjectFiles,
  viewProjects,
  deleteProject,
  getProjectDetails,
  addProjectFiles,
  delteProjectFiles
};