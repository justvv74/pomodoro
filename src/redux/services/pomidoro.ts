// slices/pomidoroSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

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
    error: number | null;
    data: Pomidoro[];
}

const initialState: PomidoroState = {
    loading: false,
    error: null,
    data: [],
};

// Указываем, что `rejectValue` имеет тип `number`
export const fetchPomidoroList = createAsyncThunk<
    Pomidoro[], // Успешный результат
    void, // Аргументы thunk
    {
        state: RootState;
        rejectValue: number; // Тип значения ошибки
    }
>('pomidoro/fetchPomidoroList', async (_, { getState, rejectWithValue }) => {
    try {
        const response = await fetch('api/timers/list', {
            credentials: 'include',
        });

        const result = await response.json();
        const list = result;
        console.log('pomidoro/fetchPomidoroList', result);
        const state = getState();

        if (state.pomidorId.id || state.pomidorId.id !== 0) {
            const indexItem = list.find((i: Pomidoro) => i.id === state.pomidorId.id);
            if (indexItem) {
                const index = list.indexOf(indexItem);
                list.unshift(...list.splice(index, 1));
            }
        } else {
            list.reverse();
        }

        return list;
    } catch (err: any) {
        // Возвращаем код ошибки через rejectWithValue
        return rejectWithValue(err.response?.status || 500);
    }
});

const pomidoroSlice = createSlice({
    name: 'pomidoro',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPomidoroList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPomidoroList.fulfilled, (state, action: PayloadAction<Pomidoro[]>) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPomidoroList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 500; // Теперь action.payload имеет тип number
            });
    },
});

export default pomidoroSlice.reducer;
