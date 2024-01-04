
import { configureStore } from "@reduxjs/toolkit";
import treeReducer from "../reducer/treeSlice"; // Update the import to point to treeSlice

export const store = configureStore({
  reducer: {
    treeD: treeReducer, // Use the treeSlice.reducer here
  },
});
