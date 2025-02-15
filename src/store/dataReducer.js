import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lessons: [],
  lesson: null,
  teachers: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLessons: (state, action) => ({
      ...state,
      lessons: action.payload,
    }),
    setLesson: (state, action) => ({
      ...state,
      lesson: action.payload,
    }),
    setTopic: (state, action) => ({
      ...state,
      topic: action.payload,
    }),
    setCraft: (state, action) => ({
      ...state,
      craft: { ...state.craft, ...action.payload },
    }),
    setCraftList: (state, action) => ({
      ...state,
      craftList: [...state.craftList, ...action.payload],
    }),
    setFood: (state, action) => ({
      ...state,
      food: { ...state.food, ...action.payload },
    }),
    setFoodList: (state, action) => ({
      ...state,
      foodList: [...state.foodList, ...action.payload],
    }),
    setSubject: (state, action) => ({
      ...state,
      subject: { ...state.subject, ...action.payload },
    }),
    setSubjectList: (state, action) => ({
      ...state,
      subject: [...state.subject, ...action.payload],
    }),
    setGame: (state, action) => ({
      ...state,
      game: { ...state.game, ...action.payload },
    }),
    setGameList: (state, action) => ({
      ...state,
      gameList: action.payload,
    }),
    setTeachersList: (state, action) => ({
      ...state,
      teachers: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  setLessons,
  setLesson,
  setTopic,
  setCraft,
  setFood,
  setMemory,
  setSubject,
  setSubjectList,
  setGame,
  setGameList,
  setFoodList,
  setCraftList,
  setTeachersList,
} = dataSlice.actions;

export default dataSlice.reducer;
