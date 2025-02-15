import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const entitiesReducer = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    setEntity: (_, action) => action.payload,
  },
});

export const { setEntity } = entitiesReducer.actions;

export default entitiesReducer.reducer;
