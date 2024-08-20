import { MutableRefObject, RefObject, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { updatePomidor } from '@services/frontend/updateTimer';
import { setCurrentTimer } from '@redux/services/currentTimer';
import { fetchPomidoroList, Pomidoro } from '@redux/services/pomidoro';
import { setISystemMessage } from '@redux/services/systemMessage';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';

export const useTimerLogic = (
    timerType: 'pomidor' | 'break',
    time: number,
    setTimerType: (type: 'pomidor' | 'break') => void,
    startTimer: () => void,
    pauseTimer: () => void,
    resetTimer: () => void,
    isFirstRenderCurrentTimer: MutableRefObject<boolean>
) => {
    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);

    const changetimerType = useCallback(() => {
        const breakDuration =
            (data.current_break + 1) % settings.before_big_break === 0
                ? settings.big_break_duration * SECONDS_IN_MINUTE
                : settings.break_duration * SECONDS_IN_MINUTE;

        const choiseTimerType =
            timerType === 'pomidor' ? (data.current_pomidor >= data.pomidors ? 'pomidor' : 'break') : 'pomidor';

        const body: Partial<Pomidoro> = {
            current_pomidor_timer: timerType === 'pomidor' ? settings.timer_duration * SECONDS_IN_MINUTE : undefined,
            current_break_timer: timerType === 'break' ? breakDuration : undefined,
            current_timer: choiseTimerType,
            current_pomidor: timerType === 'pomidor' ? data.current_pomidor + 1 : undefined,
            current_break: timerType === 'break' ? data.current_break + 1 : undefined,
            timer_complete: timerType === 'pomidor' ? data.current_pomidor >= data.pomidors : undefined,
        };
        try {
            updatePomidor(data.id, body).then((res: Pomidoro) => {
                isFirstRenderCurrentTimer.current = false;
                dispatch(setCurrentTimer(res));
                setTimerType(choiseTimerType);
                if (res.timer_complete) {
                    dispatch(fetchPomidoroList());
                }
            });
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    }, [data, settings, timerType, dispatch, isFirstRenderCurrentTimer, setTimerType]);

    const handleClickPause = useCallback(async () => {
        pauseTimer();
        const body: Partial<Pomidoro> = {
            current_pomidor_timer: time,
            current_timer: 'pomidor',
        };

        updatePomidor(data.id, body)
            .then((res) => {
                dispatch(setCurrentTimer(res));
            })
            .catch((err) => {
                const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
                dispatch(setISystemMessage(errorMessage));
            });
    }, [pauseTimer, time, data, dispatch]);

    const handleClickStop = useCallback(async () => {
        resetTimer();

        const body: Partial<Pomidoro> = {
            current_pomidor_timer: settings.timer_duration * SECONDS_IN_MINUTE,
        };

        updatePomidor(data.id, body)
            .then((res) => {
                dispatch(setCurrentTimer(res));
            })
            .catch((err) => {
                const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
                dispatch(setISystemMessage(errorMessage));
            });
    }, [resetTimer, settings.timer_duration, data, dispatch]);

    return {
        changetimerType,
        handleClickPause,
        handleClickStop,
    };
};
