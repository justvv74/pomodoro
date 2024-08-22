// imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { setISystemMessage } from './systemMessage';
import axios, { AxiosError } from 'axios';

// интерфейс данных для данных пользователя
export interface IUserData {
    username: string;
}

interface IUserInitialState {
    userDataLoading: boolean;
    userDataError: string;
    userData: IUserData;
}

// начальное состояние
const initialState: IUserInitialState = {
    userDataLoading: false,
    userDataError: '',
    userData: {
        username: 'light',
    },
};

// асинхронный thunk для получения настроек пользователя
export const getUserDataAsync = createAsyncThunk<IUserData, void, { state: RootState }>(
    'userData/fetch',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const result = await axios.get('api/user', {
                withCredentials: true,
            });

            return result.data;
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError &&
                ((err.response && err.response.data.message) || err.message || 'Unknown error occurred');
            dispatch(setISystemMessage(errorMessage));
            return rejectWithValue(errorMessage || 'Unknown error');
        }
    }
);

// создание слайса с помощью createSlice
const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDataAsync.pending, (state) => {
                state.userDataLoading = true;
                state.userDataError = '';
            })
            .addCase(getUserDataAsync.fulfilled, (state, action: PayloadAction<IUserData>) => {
                state.userData = action.payload;
                state.userDataLoading = false;
            })
            .addCase(getUserDataAsync.rejected, (state, action) => {
                state.userDataLoading = false;
                state.userDataError = action.payload as string;
            });
    },
});

// экспорт редюсера
export default userDataSlice.reducer;
