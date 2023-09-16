import { createSlice } from "@reduxjs/toolkit";
import { fetchTreeData } from "./treeAsyncThunk";

const initialState = {
  empData: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    // setBooleanTrue(state) {
    //   state.empData = 1;
    // },
    addEmployee(state, action) {
      state.empData.push(action.payload);
    },
    deleteEmployee(state, action) {
      state.empData = state.empData.filter(
        (employee) => employee.id !== action.payload
      );
    },
    updateEmployee(state, action) {
      state.empData = state.empData.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeData.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(fetchTreeData.fulfilled, (state, action) => {
        state.empData = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })

  },
});

export const {
  setBooleanTrue,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} = treeSlice.actions;

export default treeSlice.reducer;
