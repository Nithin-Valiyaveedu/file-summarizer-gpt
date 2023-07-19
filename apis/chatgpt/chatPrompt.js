import axiosInstance from "../axios";

const getChatResponse = (payload, projectId) => axiosInstance.post(`/ai/chat/${projectId}`, payload);
const getChatHistory = (projectId, limit, offset) => axiosInstance.get(`/ai/get-chat-history/${projectId}?limit=${limit}&offset=${offset}`);

export const chatPromptApis = {
  getChatResponse,
  getChatHistory
};

