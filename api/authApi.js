import axiosClient from "./axiosClient";

const url = "/auth/";
const authApi = {
  login: async (data) => {
    const response = await axiosClient.post(
      `${url}login/`,
      JSON.stringify(data)
    );
    return response;
  },
  register: async (data) => {
    const response = await axiosClient.post(url, JSON.stringify(data));
    return response;
  },
  sendOtp: async (data) => {
    const response = await axiosClient.post(
      `${url}reset-password`,
      JSON.stringify(data)
    );
    return response;
  },
  confirmOtp: async (data) => {
    const response = await axiosClient.post(
      `${url}auth-otp`,
      JSON.stringify(data)
    );
    return response;
  },
  changePassword: async (data) => {
    const response = await axiosClient.post(
      `${url}change-password`,
      JSON.stringify(data)
    );
    return response;
  },
  updateProfile: async (id, formData) => {
    const response = await axiosClient.post(`${url}update/${id}`, formData);
    return response;
  },
};
export default authApi;
