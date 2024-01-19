import axiosClient from "./axiosClient";

const url = "/macro/";
const macroApi = {
  getTdeeMethod1: (data) => {
    const response = axiosClient.post(
      `${url}calculate-expenditure/method-1`,
      JSON.stringify(data)
    );
    return response;
  },
  getMacro: (data) => {
    const response = axiosClient.post(
      `${url}calculate-macros`,
      JSON.stringify(data)
    );
    return response;
  },
  updateMacro: (data, id) => {
    const response = axiosClient.put(
      `${url}update-expenditure/${id}`,
      JSON.stringify(data)
    );
    return response;
  },
};
export default macroApi;
