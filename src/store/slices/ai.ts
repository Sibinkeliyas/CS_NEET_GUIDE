// types
import { DefaultRootStateProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: DefaultRootStateProps["ai"] = {
  error: null,
  aiInitialMessage: null,
};

// ==============================|| SLICE - ai ||============================== //

const ai = createSlice({
  name: "ai",
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },
    getAiInitialInput(state, action) {
      state.aiInitialMessage = action.payload;
    },
  },
});

export default ai.reducer;

export const { hasError, getAiInitialInput } = ai.actions;
