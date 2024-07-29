import axiosClient from "./axiosClient";

const url = "/key/";
const keyApi = {
  getKey: async () => {
    const response = await axiosClient.get(`${url}`);
    return response;
  },
};
export default keyApi;
