// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // интерфейсы
// export interface ICurrentTimerData {
//     id: number;
//     user_id: number;
//     descr: string;
//     pomidors: number;
//     current_pomidor_timer: number;
//     current_pomidor: number;
//     current_break_timer: number;
//     current_break: number;
//     current_timer: 'pomidor' | 'break';
//     timer_complete: boolean;
// }

// export interface ICurrentTimer {
//     data: ICurrentTimerData;
// }

// const initialState: ICurrentTimer = {
//     data: {
//         id: 0,
//         user_id: 0,
//         descr: '',
//         pomidors: 0,
//         current_pomidor_timer: 0,
//         current_pomidor: 0,
//         current_break_timer: 0,
//         current_break: 0,
//         current_timer: 'pomidor',
//         timer_complete: false,
//     },
// };

// const currentTimerSlice = createSlice({
//     name: 'currentTimer',
//     initialState,
//     reducers: {
//         setCurrentTimer: (state, action: PayloadAction<ICurrentTimerData>) => {
//             state.data = action.payload;
//         },
//     },
// });

// export const { setCurrentTimer } = currentTimerSlice.actions;

// export default currentTimerSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { setManualLoading } from './pomidoro';
import { setISystemMessage } from './systemMessage';

// Интерфейсы
export interface ICurrentTimerData {
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

export interface ICurrentTimer {
    data: ICurrentTimerData;
    loading: boolean;
    error: string | null;
}

const initialState: ICurrentTimer = {
    data: {
        id: 0,
        user_id: 0,
        descr: '',
        pomidors: 0,
        current_pomidor_timer: 0,
        current_pomidor: 0,
        current_break_timer: 0,
        current_break: 0,
        current_timer: 'pomidor',
        timer_complete: false,
    },
    loading: false,
    error: null,
};

// Thunk для получения таймера по id
export const fetchTimerById = createAsyncThunk<ICurrentTimerData, number>(
    'currentTimer/fetchTimerById',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setManualLoading(true));
            const response = await axios.get<ICurrentTimerData>(`/api/timers/${id}/get`, {
                withCredentials: true,
            });

            return response.data;
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError && err.response
                    ? err.response.data.message || 'Unknown error occurred'
                    : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage.message));
            return rejectWithValue(errorMessage);
        } finally {
            dispatch(setManualLoading(false));
        }
    }
);

const currentTimerSlice = createSlice({
    name: 'currentTimer',
    initialState,
    reducers: {
        setCurrentTimer: (state, action: PayloadAction<ICurrentTimerData>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTimerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTimerById.fulfilled, (state, action: PayloadAction<ICurrentTimerData>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchTimerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setCurrentTimer } = currentTimerSlice.actions;
export default currentTimerSlice.reducer;
