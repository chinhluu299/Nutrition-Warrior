// detectionApi.js
import axiosClient from "./axiosClient";

const url = "/detection/";
const detectionApi = {
  detectFood: (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = axiosClient.post(`${url}detect/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  },
};
export default detectionApi;
