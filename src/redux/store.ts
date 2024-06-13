import { configureStore } from '@reduxjs/toolkit';
import reducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    user: reducer,
  },
});

// Типы для состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
