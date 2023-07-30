
export const setTreeDataa = () => {
    return {
      type: 'SET_BOOLEAN_TRUE',
    };
  };

export const UPDATE_TREE_DATA = 'UPDATE_TREE_DATA';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export const updateTreeData = (treeData) => {
  return {
    type: UPDATE_TREE_DATA,
    payload: treeData,
  };
};

export const addEmployee = (employeeData) => ({
  type: ADD_EMPLOYEE,
  payload: employeeData,
});

export const deleteEmployee = (employeeId) => ({
  type: DELETE_EMPLOYEE,
  payload: employeeId,
});

export const updateEmployee = (employeeData) => ({
  type: UPDATE_EMPLOYEE,
  payload: employeeData,
});
