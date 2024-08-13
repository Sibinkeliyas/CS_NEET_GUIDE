// types
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["syllabus"] = {
  error: null,
  syllabus : []
};

// ==============================|| SLICE - SYLLABUS ||============================== //

const syllabus = createSlice({
  name: "syllabus",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getSyllabusSuccess(state, action) {
      state.syllabus = action.payload
    }
  },
});

export default syllabus.reducer;

export const { hasError, getSyllabusSuccess } = syllabus.actions;
