import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { useReducer } from "react";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
