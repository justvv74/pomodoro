import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserSettingsData } from './userSettings';

export type IOldSettingsData = string;

export interface IOldSettingsDataState {
    settingsData: IUserSettingsData;
}

const initialState: IOldSettingsDataState = {
    settingsData: {
        timer_duration: 25,
        break_duration: 5,
        big_break_duration: 15,
        before_big_break: 4,
        auto_start: true,
        alerts: true,
        theme: 'light',
    },
};

const oldSettingsDataSlice = createSlice({
    name: 'oldSettings',
    initialState,
    reducers: {
        oldSettingsData: (state, action: PayloadAction<IUserSettingsData>) => {
            state.settingsData = action.payload;
        },
    },
});

export const { oldSettingsData } = oldSettingsDataSlice.actions;

export default oldSettingsDataSlice.reducer;
