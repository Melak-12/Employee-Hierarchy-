import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTreeData = createAsyncThunk('tree/fetchTreeData', async () => {
  try {
    const response = await axios.get('https://employee-stracture-default-rtdb.firebaseio.com/tree.json');
    const data = response.data;
    return data ? Object.values(data) : [];
  } catch (error) {
    throw error;
  }
});
