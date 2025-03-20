import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    addAdmin: (state, action) => {
      return action.payload;
    },
    removeAdmin: (state, action) => {
      return null;
    },
  },
});
export const { addAdmin, removeAdmin } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
