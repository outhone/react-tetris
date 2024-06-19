import { createSlice } from '@reduxjs/toolkit';

type PageState = {
  view: 'home' | 'single-game';
};

const initialState: PageState = {
  view: 'home',
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    goHome: (state) => ({ ...state, view: 'home' }),
    goSinglePlayer: (state) => ({ ...state, view: 'single-game' }),
  },
});

export const { goHome, goSinglePlayer } = pageSlice.actions;

export default pageSlice.reducer;
