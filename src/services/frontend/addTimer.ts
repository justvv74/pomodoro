import axios from 'axios';

export const createPomidor = async (description: string, timerDuration: number, breakDuration: number) => {
    return await axios.post(
        'api/timers/add',
        {
            descr: description,
            pomidors: 1,
            current_pomidor_timer: timerDuration * 60,
            current_pomidor: 1,
            current_break_timer: breakDuration * 60,
            current_break: 0,
            current_timer: 'pomidor',
            timer_complete: false,
        },
        { withCredentials: true }
    );
};
