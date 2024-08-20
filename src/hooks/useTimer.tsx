import { RootState } from '@redux/store';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';

const useTimer = (initialTime: number = SECONDS_IN_MINUTE, timerType: 'pomidor' | 'break') => {
    const [time, setTime] = useState(initialTime); // Устанавливаем начальное время
    const [timerState, setTimerState] = useState<'start' | 'pause' | 'stop'>('stop');
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Ссылка на таймер
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);

    // Функция для запуска таймера
    const startTimer = useCallback(() => {
        if (timerRef.current === null) {
            console.log('startTimer');
            setTimerState('start');
            // Запускаем только если таймер не работает
            timerRef.current = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
    }, []);

    // Функция для паузы таймера
    const pauseTimer = useCallback(() => {
        if (timerRef.current !== null) {
            console.log('pauseTimer');
            setTimerState('pause');
            clearInterval(timerRef.current);
            timerRef.current = null; // Очищаем ссылку на таймер
        }
    }, []);

    // Функция для сброса и остановки таймера
    const resetTimer = useCallback(() => {
        console.log('resetTimer');
        pauseTimer(); // Останавливаем таймер
        setTimerState('stop');
        setTime(
            timerType === 'pomidor'
                ? settings.timer_duration * SECONDS_IN_MINUTE
                : settings.break_duration * SECONDS_IN_MINUTE
        ); // Сбрасываем время к начальному значению
    }, [pauseTimer, timerType, setTimerState, settings]);

    // Очищаем таймер при размонтировании компонента
    useEffect(() => {
        return () => {
            pauseTimer();
        };
    }, [pauseTimer]);

    useEffect(() => {
        setTime(initialTime); // Сбрасываем время к начальному значению
    }, [initialTime]);

    return { time, startTimer, pauseTimer, resetTimer, timerState };
};

export default useTimer;
