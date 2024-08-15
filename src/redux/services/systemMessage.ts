import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// интерфейсы
export type ISystemMessage = string;

export interface ISystemMessageState {
    message: ISystemMessage;
}

// начальное состояние
const initialState: ISystemMessageState = {
    message: '',
};

// создание слайса с помощью createSlice
const systemMessageSlice = createSlice({
    name: 'systemMessage',
    initialState,
    reducers: {
        setISystemMessage: (state, action: PayloadAction<ISystemMessage>) => {
            state.message = action.payload;
        },
    },
});

// экспорт экшенов
export const { setISystemMessage } = systemMessageSlice.actions;

// экспорт редюсера
export default systemMessageSlice.reducer;
