// third-party
import { combineReducers } from "redux";

// project imports
import authReducer from "./slices/auth";
import syllabusReducer from "./slices/syllabus";
import menuReducer from "./slices/menu";
import aiReducer from "./slices/ai";
import userActivityReducer from "./slices/userActivity";


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  authReducer,
  syllabusReducer,
  menuReducer,
  aiReducer,
  userActivityReducer
});

export default reducer;
