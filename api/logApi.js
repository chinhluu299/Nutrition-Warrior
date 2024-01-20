import axiosClient from "./axiosClient";

const url = "/daily-logs/";
const dialyLogApi = {
  addFood: async (userId, date, data) => {
    const response = await axiosClient.post(
      `${url}add-food/${userId}/${date}`,
      JSON.stringify(data)
    );
    console.log(response);
    return response;
  },
};
export default dialyLogApi;
