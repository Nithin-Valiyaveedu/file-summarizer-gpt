import axiosInstance from "../axios";

const getChatResponse = (payload, projectId) => axiosInstance.post(`/ai/chat/${projectId}`, payload);

export const chatPromptApis = {
  getChatResponse,
};

