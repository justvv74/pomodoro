import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userDataReducer from './services/userData';
import pomidoroReducer from './services/pomidoro';
import pomidoroIdReducer from './services/pomidoroId';
import currentTimerReducer from './services/currentTimer';
import userSettingsReducer from './services/userSettings';
import systemMessageReducer from './services/systemMessage';

// Конфигурация store
export const store = configureStore({
    reducer: {
        // Добавляем срез RTK Query как редьюсер
        userData: userDataReducer,
        pomidoro: pomidoroReducer,
        pomidorId: pomidoroIdReducer,
        currentTimer: currentTimerReducer,
        userSettings: userSettingsReducer,
        systemMessage: systemMessageReducer,
    },
});

// Настраиваем слушатели для refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Типизация store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
