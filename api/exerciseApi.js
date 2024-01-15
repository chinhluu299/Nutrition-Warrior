import axiosClient from "./axiosClient";

const url = "/exercises/";
const exerciseApi = {
  getAllExercises: (limit = 10) => {
    const response = axiosClient.get(`${url}get-all-exercises?limit=${limit}`);
    return response;
  },
  getExercisesByName: (keyword) => {
    const response = axiosClient.get(`${url}get-exercises-by-name/${keyword}`);
    return response;
  },
  getExercisesByBodyPart: (keyword) => {
    const response = axiosClient.get(
      `${url}get-exercises-for-body-part/${keyword}`
    );
    return response;
  },
  getListEquipment: () => {
    const response = axiosClient.get(`${url}get-equipment-list/`);
    return response;
  },
  getExerciseByEquipment: (keyword) => {
    const response = axiosClient.get(
      `${url}get-exercises-by-equipment/${keyword}/`
    );
    return response;
  },
  getExerciseByTarget: (keyword) => {
    const response = axiosClient.get(
      `${url}get-exercises-by-target/${keyword}/`
    );
    return response;
  },
  getListTarget: () => {
    const response = axiosClient.get(`${url}get-target-list/`);
    return response;
  },
};
export default exerciseApi;
