import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';
import { setISystemMessage } from './systemMessage';

export interface Pomidoro {
    id: number;
    user_id: number;
    descr: string;
    pomidors: number;
    current_pomidor_timer: number;
    current_pomidor: number;
    current_break_timer: number;
    current_break: number;
    current_timer: string;
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
        const list = response.data;
        const state = getState();

        list.reverse();

        if (state.pomidorId.id || state.pomidorId.id !== 0) {
            const indexItem = list.find((i: Pomidoro) => i.id === state.pomidorId.id);
            if (indexItem) {
                const index = list.indexOf(indexItem);
                list.unshift(...list.splice(index, 1));
            }
        }

        return list;
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';
        dispatch(setISystemMessage(errorMessage.message));
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

export const { setManualLoading } = pomidoroSlice.actions;

export default pomidoroSlice.reducer;
