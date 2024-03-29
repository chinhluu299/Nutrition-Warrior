import axios from "axios";
import store from "../app/store";

const axiosClient = axios.create({
  baseURL: "https://3981-14-187-80-128.ngrok-free.app/api", //host
  //baseURL: "http://127.0.0.1:8000/api", //local
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.rootReducer.auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosClient.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (originalConfig.url !== "/auth/signin" && err.response) {
//       // Access Token was expired

//       if (err.response.status === 401) {
//         originalConfig._retry = true;

//         try {
//           const rs = await axiosClient.post("/auth/refreshtoken", {
//             refreshToken: localStorage.getItem("refreshToken"),
//           });

//           const { accessToken } = rs.data;

//           if (accessToken) {
//             localStorage.setItem("accessToken", accessToken);
//           }
//           window.location = "/";

//           return axiosClient(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//       // Refresh Token was expired
//       if (err.response.status === 403) {
//         alert("Your session has been expired. Please log in again!");
//         localStorage.clear();
//         window.location = "/login";
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosClient;
