import axios, { AxiosError } from 'axios';

export const createPomidor = async (description: string, timerDuration: number, breakDuration: number) => {
    // return await axios.post(
    //     'api/timers/add',
    //     {
    //         descr: description,
    //         pomidors: 1,
    //         current_pomidor_timer: timerDuration * 60,
    //         current_pomidor: 1,
    //         current_break_timer: breakDuration * 60,
    //         current_break: 1,
    //         current_timer: 'pomidor',
    //         timer_complete: false,
    //     },
    //     { withCredentials: true }
    // );

    const body = {
        descr: description,
        pomidors: 1,
        current_pomidor_timer: timerDuration * 60,
        current_pomidor: 1,
        current_break_timer: breakDuration * 60,
        current_break: 1,
        current_timer: 'pomidor',
        timer_complete: false,
    };

    try {
        await axios.post(
            'api/timers/add',
            { ...body },
            {
                withCredentials: true,
            }
        );
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred 1';
        throw new Error(errorMessage);
    }
};
