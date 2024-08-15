import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ISystemMessage = string;

export interface ISystemMessageState {
    message: ISystemMessage;
}

const initialState: ISystemMessageState = {
    message: '',
};

const systemMessageSlice = createSlice({
    name: 'systemMessage',
    initialState,
    reducers: {
        setISystemMessage: (state, action: PayloadAction<ISystemMessage>) => {
            state.message = action.payload;
        },
    },
});

export const { setISystemMessage } = systemMessageSlice.actions;

export default systemMessageSlice.reducer;
