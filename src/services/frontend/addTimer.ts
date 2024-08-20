import axios, { AxiosError } from 'axios';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';

export const createPomidor = async (description: string, timerDuration: number, breakDuration: number) => {
    const body = {
        descr: description,
        pomidors: 1,
        current_pomidor_timer: timerDuration * SECONDS_IN_MINUTE,
        current_pomidor: 1,
        current_break_timer: breakDuration * SECONDS_IN_MINUTE,
        current_break: 1,
        current_timer: 'pomidor',
        timer_complete: false,
    };

    try {
        const response = await axios.post(
            'api/timers/add',
            { ...body },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (err) {
        const errorMessage: string =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred 1';
        throw new Error(errorMessage);
    }
};
