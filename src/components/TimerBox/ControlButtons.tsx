// ControlButtons.tsx
import React from 'react';
import styles from './TimerBox.module.scss';

interface ControlButtonsProps {
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onStop: () => void;
    onComplete: () => void;
    isPomidorRunning: boolean;
    isBreakRunning: boolean;
    isPomidorPaused: boolean;
    isBreakPaused: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
    onStart,
    onPause,
    onResume,
    onStop,
    onComplete,
    isPomidorRunning,
    isBreakRunning,
    isPomidorPaused,
    isBreakPaused,
}) => {
    return (
        <div className={styles.timerBoxBtnBox}>
            {!isPomidorRunning && !isBreakRunning && (
                <button className={styles.timerBoxBtnBoxStartBtn} onClick={onStart}>
                    Старт
                </button>
            )}
            {isPomidorRunning && !isPomidorPaused && (
                <button className={styles.timerBoxBtnBoxStartBtn} onClick={onPause}>
                    Пауза
                </button>
            )}
            {isPomidorPaused && (
                <button className={styles.timerBoxBtnBoxStartBtn} onClick={onResume}>
                    Продолжить
                </button>
            )}
            {isPomidorRunning && (
                <button className={styles.timerBoxBtnBoxStopBtn} onClick={onStop}>
                    Стоп
                </button>
            )}
            {isPomidorPaused && (
                <button className={styles.timerBoxBtnBoxStopBtn} onClick={onComplete}>
                    Сделано
                </button>
            )}
            {isBreakRunning && !isBreakPaused && (
                <button className={styles.timerBoxBtnBoxStartBtn} onClick={onPause}>
                    Пауза
                </button>
            )}
            {isBreakPaused && (
                <button className={styles.timerBoxBtnBoxStartBtn} onClick={onResume}>
                    Продолжить
                </button>
            )}
        </div>
    );
};

export default ControlButtons;
