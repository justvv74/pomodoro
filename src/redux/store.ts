import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import userDataReducer from './services/userData';
import pomidoroReducer from './services/pomidoro';
import currentTimerReducer from './services/currentTimer';
import userSettingsReducer from './services/userSettings';
import systemMessageReducer from './services/systemMessage';
import oldSettingsReducer from './services/oldSettingsData';

// Конфигурация store
export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        pomidoro: pomidoroReducer,
        currentTimer: currentTimerReducer,
        userSettings: userSettingsReducer,
        systemMessage: systemMessageReducer,
        oldSettings: oldSettingsReducer,
    },
});

// Настраиваем слушатели для refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

// Типизация store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
