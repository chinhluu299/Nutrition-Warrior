import axiosClient from "./axiosClient";

const url = "/foods/";
const foodApi = {
  searchFood: (keyword) => {
    const response = axiosClient.get(`${url}search/${keyword}`);
    return response;
  },
};
export default foodApi;
