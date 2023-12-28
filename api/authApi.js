import axiosClient from "./axiosClient";

const url = "/auth/";
const authApi = {
  login: async (data) => {
    const response = await axiosClient.post(
      `${url}login/`,
      JSON.stringify(data)
    );
    console.log(response);
    return response;
  },
  register: async (data) => {
    const response = await axiosClient.post(url, JSON.stringify(data));
    return response;
  },
};
export default authApi;
