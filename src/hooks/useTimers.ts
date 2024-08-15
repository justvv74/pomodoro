// hooks/useTimer.ts
import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number) => {
    const [time, setTime] = useState(initialTime);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (time === 0) {
            clearInterval(intervalId!);
            setIntervalId(null);
        }
    }, [time]);

    const start = () => {
        if (!intervalId) {
            const id = setInterval(() => setTime((prev) => prev - 1), 1000);
            setIntervalId(id);
            setIsPaused(false);
        }
    };

    const pause = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
            setIsPaused(true);
        }
    };

    const reset = (newTime: number) => {
        clearInterval(intervalId!);
        setTime(newTime);
        setIntervalId(null);
        setIsPaused(false);
    };

    return { time, start, pause, reset, isPaused };
};
