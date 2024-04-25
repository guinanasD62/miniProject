import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './balanceSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    balance: balanceReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
