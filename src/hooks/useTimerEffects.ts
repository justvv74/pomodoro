import { MutableRefObject, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import timerEnd from 'public/timer-end.mp3';

export const useTimerEffects = (
    timerType: 'pomidor' | 'break',
    startTimer: () => void,
    setInitialTime: (time: number) => void,
    loading: boolean,
    isFirstRenderTime: MutableRefObject<boolean>,
    isFirstRenderId: MutableRefObject<boolean>,
    setTimerType: React.Dispatch<React.SetStateAction<'pomidor' | 'break'>>,
    pauseTimer: () => void,
    time: number,
    changetimerType: () => void
) => {
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);
    const isFirstRenderCurrentTimer = useRef<boolean>(true);

    useEffect(() => {
        if (isFirstRenderCurrentTimer.current) {
            isFirstRenderCurrentTimer.current = false;
            return;
        }
        console.log('current_timer');
        setInitialTime(timerType === 'pomidor' ? data.current_pomidor_timer : data.current_break_timer);
        if (timerType === 'break' || (timerType === 'pomidor' && settings.auto_start)) {
            startTimer(); // Запускаем таймер, если это перерыв или если автостарт включен для рабочего таймера
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.current_timer]);

    useEffect(() => {
        if (loading) {
            isFirstRenderTime.current = true;
            isFirstRenderCurrentTimer.current = true;
        }
    }, [loading, isFirstRenderTime]);

    useEffect(() => {
        if (isFirstRenderId.current) {
            isFirstRenderId.current = false;
            return;
        }
        setInitialTime(
            data.current_timer === 'pomidor'
                ? data.timer_complete
                    ? 0
                    : data.current_pomidor_timer
                : data.current_break_timer
        );
        console.log('setInitialTime', data);

        setTimerType(data.current_timer);
        pauseTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]);

    useEffect(() => {
        if (data.id === 0 || data.user_id === 0 || data.pomidors === 0) {
            return;
        }

        if (isFirstRenderTime.current) {
            isFirstRenderTime.current = false;
            return;
        }
        console.log('time', time);
        if (time === 0) {
            if (settings.alerts) {
                const audio = new Audio(timerEnd);
                audio.play();
            }

            changetimerType();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);
};
