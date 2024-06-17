import { createSlice } from '@reduxjs/toolkit';

type PageState = {
  view: 'home' | 'single-game';
};

const initialState: PageState = {
  view: 'home',
};

export const pageSlice = createSlice({
  name: 'page',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    goHome: (state) => ({ ...state, view: 'home' }),
    goSinglePlayer: (state) => ({ ...state, view: 'single-game' }),
  },
});

export const { goHome, goSinglePlayer } = pageSlice.actions;

export default pageSlice.reducer;
