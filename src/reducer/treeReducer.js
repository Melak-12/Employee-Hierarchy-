// import { fetchTreeData } from "./treeAsyncThunk";
// import { createSlice } from "@reduxjs/toolkit";

// import { UPDATE_TREE_DATA } from "../actions";
// import { UPDATE_EMPLOYEE,DELETE_EMPLOYEE,ADD_EMPLOYEE } from "../actions";
// const initialState = {
//   empData: [],
//   isLoading: false,
//   isPending: false,
//   isSuccess: false,
//   isError: false,
//   errorMessage:''
//   };
  
//   const treeReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_BOOLEAN_TRUE':
//         return {
//           ...state,
//           empData: 1,
//         };
     
//       case UPDATE_TREE_DATA:
//         return {
//           ...state,
//           empData: action.payload
//         };
      
//       case ADD_EMPLOYEE:
//         return {
//           ...state,
//           empData: [...state.empData, action.payload],
//         };
      
//       case DELETE_EMPLOYEE:
//         return {
//           ...state,
//           empData: state.empData.filter((employee) => employee.id !== action.payload)
//         };
      
//       case UPDATE_EMPLOYEE:
//         return {
//           ...state,
//           empData: state.empData.map((employee) =>
//             employee.id === action.payload.id ? action.payload : employee
//           ),
//         };
      
//       default:
//         return state;
//     }
//   };
  
//   export default treeReducer;
