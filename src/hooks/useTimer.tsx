import { RootState } from '@redux/store';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const useTimer = (initialTime: number = 60, timerType: 'pomidor' | 'break') => {
    const [time, setTime] = useState(initialTime); // Устанавливаем начальное время
    const [timerState, setTimerState] = useState<'play' | 'pause' | 'stop'>('stop');
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Ссылка на таймер
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);

    // Функция для запуска таймера
    const startTimer = () => {
        if (timerRef.current === null) {
            console.log('startTimer');
            setTimerState('play');
            // Запускаем только если таймер не работает
            timerRef.current = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
    };

    // Функция для паузы таймера
    const pauseTimer = () => {
        if (timerRef.current !== null) {
            console.log('pauseTimer');
            setTimerState('pause');
            clearInterval(timerRef.current);
            timerRef.current = null; // Очищаем ссылку на таймер
        }
    };

    // Функция для сброса и остановки таймера
    const resetTimer = () => {
        console.log('resetTimer');
        pauseTimer(); // Останавливаем таймер
        setTimerState('stop');
        setTime(timerType === 'pomidor' ? settings.timer_duration * 60 : settings.break_duration * 60); // Сбрасываем время к начальному значению
    };

    // Очищаем таймер при размонтировании компонента
    useEffect(() => {
        return () => {
            pauseTimer();
        };
    }, []);

    useEffect(() => {
        console.log('initialTime', initialTime);
        pauseTimer(); // Останавливаем таймер
        setTime(initialTime); // Сбрасываем время к начальному значению
    }, [initialTime]);

    return { time, startTimer, pauseTimer, resetTimer, timerState, setTimerState };
};

export default useTimer;
