import axiosClient from "./axiosClient";

const url = "/food/";
const foodApi = {
  searchFood: (keyword) => {
    const response = axiosClient.get(`${url}search/${keyword}`);
    return response;
  },
};
export default foodApi;
