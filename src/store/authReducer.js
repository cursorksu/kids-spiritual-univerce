import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authReducerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    clearAuthData: () => ({}),
  },
});

// Action creators are generated for each case reducer function
export const { setAuthData, clearAuthData } = authReducerSlice.actions;

export default authReducerSlice.reducer;
