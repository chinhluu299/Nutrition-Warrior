import axiosClient from "./axiosClient";

const url = "/analysis/";
const feedbackApi = {
  getFeedback: async (userId) => {
    const response = await axiosClient.get(`${url}analyze/${userId}`);
    return response;
  },
};
export default feedbackApi;
