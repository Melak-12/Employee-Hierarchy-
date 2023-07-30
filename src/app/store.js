import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "../reducer/treeReducer";

export const store = configureStore({
  reducer: {
    treeD: treeReducer,
  },
});
