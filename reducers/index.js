import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import exerciseReducer from "./exerciseReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  exercise: exerciseReducer,
});

export default rootReducer;
