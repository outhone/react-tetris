import { configureStore } from '@reduxjs/toolkit';
import pageReducer from './pageReducer';

export const store = configureStore({
  reducer: { page: pageReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {view: ViewState}
export type AppDispatch = typeof store.dispatch;
