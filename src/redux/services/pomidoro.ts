import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
import { setISystemMessage } from './systemMessage';
import { sortPomidoroList } from 'src/utils/sortPomidoroList';

export interface Pomidoro {
    id: number;
    user_id: number;
    descr: string;
    pomidors: number;
    current_pomidor_timer: number;
    current_pomidor: number;
    current_break_timer: number;
    current_break: number;
    current_timer: 'pomidor' | 'break';
    timer_complete: boolean;
}

interface PomidoroState {
    loading: boolean;
    error: string;
    data: Pomidoro[];
}

const initialState: PomidoroState = {
    loading: false,
    error: '',
    data: [],
};

export const fetchPomidoroList = createAsyncThunk<
    Pomidoro[],
    void,
    {
        state: RootState;
        rejectValue: string;
    }
>('pomidoro/fetchPomidoroList', async (_, { getState, rejectWithValue, dispatch }) => {
    try {
        const response = await axios.get<Pomidoro[]>('/api/timers/list', {
            withCredentials: true,
        });
        const list = response.data.reverse(); // реверс списка

        const state = getState();
        const currentTimerId = state.currentTimer.data?.id;

        // Сортировка списка
        const sortedList = currentTimerId ? sortPomidoroList(list, currentTimerId) : list;

        return sortedList;
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError &&
            ((err.response && err.response.data.message) || err.message || 'Unknown error occurred');
        dispatch(setISystemMessage(errorMessage));
        return rejectWithValue(errorMessage);
    }
});

const pomidoroSlice = createSlice({
    name: 'pomidoro',
    initialState,
    reducers: {
        setManualLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setPomidoroList: (state, action: PayloadAction<Pomidoro[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPomidoroList.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPomidoroList.fulfilled, (state, action: PayloadAction<Pomidoro[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPomidoroList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setManualLoading, setPomidoroList } = pomidoroSlice.actions;

export default pomidoroSlice.reducer;
