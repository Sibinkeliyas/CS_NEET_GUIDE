// types
import { IMenuProps } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

// project imports

// initial state
const initialState: IMenuProps = {
  openAuthModal: false,
  openDrawer: true,
};

// ==============================|| MENU ||============================== //

const menus = createSlice({
  name: "menus",
  initialState,
  reducers: {
    updateLoginModel(state, action) {
      state.openAuthModal = action.payload;
    },
    openSidebar(state, action) {
      state.openDrawer = action.payload;
    },
  },
});

export default menus.reducer;

export const { updateLoginModel, openSidebar } = menus.actions;
