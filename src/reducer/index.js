import { combineReducers } from 'redux';
import treeReducer from './treeReducer';

// const rootReducer = combineReducers({
//   tree: treeReducer, // You can add more reducers here if needed
// });

const rootReducer=treeReducer
export default rootReducer;
