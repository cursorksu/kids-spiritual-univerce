import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const mainMenuReducerSlice = createSlice({
  name: 'mainMenu',
  initialState,
  reducers: {
    setMainMenuCollapsed: (state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setMainMenuCollapsed } = mainMenuReducerSlice.actions;

export default mainMenuReducerSlice.reducer;
