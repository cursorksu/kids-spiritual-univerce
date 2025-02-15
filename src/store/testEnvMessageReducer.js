import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const testEnvMessage = createSlice({
  name: 'testEnvMessage',
  initialState,
  reducers: {
    setTestEnvMessageClose: (_, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setTestEnvMessageClose } = testEnvMessage.actions;

export default testEnvMessage.reducer;
