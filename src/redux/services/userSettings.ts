import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
import { setISystemMessage } from './systemMessage';

// интерфейс данных для настроек пользователя
export interface IUserSettingsData {
    timer_duration: number;
    break_duration: number;
    big_break_duration: number;
    before_big_break: number;
    auto_start: boolean;
    alerts: boolean;
    theme?: string;
}

interface IUserSettingsInitialState {
    settingsLoading: boolean;
    settingsError: string;
    settingsData: IUserSettingsData;
}

// начальное состояние
const initialState: IUserSettingsInitialState = {
    settingsLoading: false,
    settingsError: '',
    settingsData: {
        timer_duration: 25,
        break_duration: 5,
        big_break_duration: 15,
        before_big_break: 4,
        auto_start: true,
        alerts: true,
        theme: 'light',
    },
};

// асинхронный thunk для получения настроек пользователя
export const getUserSettingsAsync = createAsyncThunk<IUserSettingsData, void, { state: RootState }>(
    'userSettings/fetch',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.get('/api/settings', { withCredentials: true });
            return response.data;
        } catch (err) {
            const errorMessage =
                axios.isAxiosError(err) && err.response ? err.response.data.message : 'Unknown error occurred';

            if (axios.isAxiosError(err) && err?.response?.status === 404) {
                dispatch(setUserSettingsAsync());
            } else {
                dispatch(setISystemMessage(errorMessage));
            }

            return rejectWithValue(errorMessage || 'Unknown error');
        }
    }
);

// вспомогательная функция для создания настроек пользователя по умолчанию
export const setUserSettingsAsync = createAsyncThunk<IUserSettingsData, void, { state: RootState }>(
    'userSettings/create',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const body = {
                timer_duration: 25,
                break_duration: 5,
                big_break_duration: 15,
                before_big_break: 4,
                auto_start: true,
                alerts: true,
                theme: 'light',
            };
            const response = await axios.post('/api/settings', body, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            const errorMessage =
                axios.isAxiosError(err) && err.response ? err.response.data.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
            return rejectWithValue(errorMessage || 'Unknown error');
        }
    }
);

// асинхронный thunk для обновления настроек пользователя
export const updateUserSettingsAsync = createAsyncThunk<IUserSettingsData, IUserSettingsData, { state: RootState }>(
    'userSettings/update',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.patch(
                '/api/settings',
                {
                    timer_duration: data.timer_duration,
                    break_duration: data.break_duration,
                    big_break_duration: data.big_break_duration,
                    before_big_break: data.before_big_break,
                    auto_start: data.auto_start,
                    alerts: data.alerts,
                },
                {
                    withCredentials: true,
                }
            );

            return response.data;
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError && err.response
                    ? err.response.data.message || 'Unknown error occurred'
                    : 'Unknown error occurred';

            dispatch(setISystemMessage(errorMessage));
            return rejectWithValue(errorMessage || 'Unknown error');
        }
    }
);

// создание слайса с помощью createSlice
const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserSettingsAsync.pending, (state) => {
                state.settingsLoading = true;
                state.settingsError = '';
            })
            .addCase(getUserSettingsAsync.fulfilled, (state, action: PayloadAction<IUserSettingsData>) => {
                state.settingsData = action.payload;
                state.settingsLoading = false;
            })
            .addCase(getUserSettingsAsync.rejected, (state, action) => {
                state.settingsLoading = false;
                state.settingsError = action.payload as string;
            })
            .addCase(updateUserSettingsAsync.pending, (state) => {
                state.settingsLoading = true;
                state.settingsError = '';
            })
            .addCase(updateUserSettingsAsync.fulfilled, (state, action: PayloadAction<IUserSettingsData>) => {
                state.settingsData = action.payload;
                state.settingsLoading = false;
            })
            .addCase(updateUserSettingsAsync.rejected, (state, action) => {
                state.settingsLoading = false;
                state.settingsError = action.payload as string;
            });
    },
});

// экспорт редюсера
export default userSettingsSlice.reducer;
