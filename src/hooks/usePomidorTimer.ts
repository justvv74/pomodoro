import { useState, useEffect } from 'react';

export const usePomidorTimer = (initialDuration: number, onComplete: () => void) => {
    const [timer, setTimer] = useState(initialDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timer === 0 && isRunning) {
            onComplete();
            setIsRunning(false);
            clearInterval(intervalId as NodeJS.Timeout);
        }
    }, [timer, isRunning]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            setIntervalId(setInterval(() => setTimer((t) => t - 1), 1000));
        }
    };

    const pauseTimer = () => {
        setIsRunning(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    const resetTimer = (newDuration: number) => {
        setTimer(newDuration * 60);
        setIsRunning(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    return { timer, startTimer, pauseTimer, resetTimer, isRunning };
};

export const useBreakTimer = (initialDuration: number, onComplete: () => void) => {
    const [breakTimer, setBreakTimer] = useState(initialDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (breakTimer === 0 && isRunning) {
            onComplete();
            setIsRunning(false);
            clearInterval(intervalId as NodeJS.Timeout);
        }
    }, [breakTimer, isRunning]);

    const startBreak = () => {
        if (!isRunning) {
            setIsRunning(true);
            setIntervalId(setInterval(() => setBreakTimer((t) => t - 1), 1000));
        }
    };

    const pauseBreak = () => {
        setIsRunning(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    const resetBreak = (newDuration: number) => {
        setBreakTimer(newDuration * 60);
        setIsRunning(false);
        clearInterval(intervalId as NodeJS.Timeout);
    };

    return { breakTimer, startBreak, pauseBreak, resetBreak, isRunning };
};
