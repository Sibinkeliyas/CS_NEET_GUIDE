// types
import { DefaultRootStateProps } from "@/types";
import { Api_endpoint } from "@/types/enums";
import axiosService from "@/utils/axios";
import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "..";

// project imports

// initial state
const initialState: DefaultRootStateProps["userActivity"] = {
  error: null,
  progressData: null
};

// ==============================|| SLICE - userActivity ||============================== //

const userActivity = createSlice({
  name: "userActivity",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getUserProgressData(state, action) {
        state.progressData = action.payload
    }
  },
});

export default userActivity.reducer;

export const { hasError, getUserProgressData } = userActivity.actions;

export function getProgress(subjectUrl:string, classUrl:string, chapterUrl:string, topicUrl:string) {
  return async () => {
    try {
      const response = await axiosService.get(
        `/${Api_endpoint.postProgress}/${subjectUrl}/${classUrl}/${chapterUrl}/${topicUrl}/ncert-solution`);
      dispatch(userActivity.actions.getUserProgressData(response.data?.data));
    } catch (error) {
      dispatch(userActivity.actions.hasError(error));
    }
  };
}
