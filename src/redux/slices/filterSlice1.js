import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    setSearchTerm(state, action) {
      return action.payload;
    },
  },
});

export const { setSearchTerm } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
