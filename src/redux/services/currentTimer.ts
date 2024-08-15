import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// интерфейсы
export interface ICurrentTimerData {
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

export interface ICurrentTimer {
    data: ICurrentTimerData;
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
        current_timer: '',
        timer_complete: false,
    },
};

const currentTimerSlice = createSlice({
    name: 'currentTimer',
    initialState,
    reducers: {
        setCurrentTimer: (state, action: PayloadAction<ICurrentTimerData>) => {
            state.data = action.payload;
        },
    },
});

export const { setCurrentTimer } = currentTimerSlice.actions;

export default currentTimerSlice.reducer;
