import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./Slices/adminSlice";

const appStore = configureStore({
  reducer: {
    admin: adminReducer,
  },
});
export default appStore;
