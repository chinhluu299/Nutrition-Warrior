import { configureStore } from "@reduxjs/toolkit";
import rootReducer1 from "../reducers";
// import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };
// const storage =
//   typeof window !== "undefined"
//     ? createWebStorage("local")
//     : createNoopStorage();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = persistReducer(persistConfig, rootReducer1);

export const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
