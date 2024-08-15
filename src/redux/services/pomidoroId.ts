import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PomidorIdState = {
    id: number;
};

const initialState: PomidorIdState = {
    id: 0,
};

const pomidorIdSlice = createSlice({
    name: 'pomidorId',
    initialState,
    reducers: {
        setPomidorId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
    },
});

export const { setPomidorId } = pomidorIdSlice.actions;

export default pomidorIdSlice.reducer;
