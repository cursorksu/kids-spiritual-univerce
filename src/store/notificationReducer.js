import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
  message: {
    title: '',
    description: '',
  },
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => action.payload,
    deleteMessage: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setMessage, deleteMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
