import { configureStore } from '@reduxjs/toolkit';
import episodeReducer from './episodeSlice';
import showReducer from './showSlice';

export const store = configureStore({
    reducer: {
        show: showReducer,
        episode: episodeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
