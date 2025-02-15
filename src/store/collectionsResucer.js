import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    setCollectionsInStore: (_, action) => action.payload,
    setOneCollection: (store, { payload }) =>
      store.map((el) => (el.id === payload.id ? payload : el)),
  },
});

export const { setCollectionsInStore, setOneCollection } =
  collectionsSlice.actions;

export default collectionsSlice.reducer;
