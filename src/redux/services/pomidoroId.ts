// imports
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// тип состояния
export type PomidorIdState = {
    id: number;
};

// начальное состояние
const initialState: PomidorIdState = {
    id: 0, // установите начальное значение, например 0
};

// создание слайса с помощью createSlice
const pomidorIdSlice = createSlice({
    name: 'pomidorId',
    initialState,
    reducers: {
        setPomidorId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
    },
});

// экспорт экшенов
export const { setPomidorId } = pomidorIdSlice.actions;

// экспорт редюсера
export default pomidorIdSlice.reducer;
