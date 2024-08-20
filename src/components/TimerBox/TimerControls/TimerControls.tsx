import React from 'react';
import styles from './TimerControls.module.scss';
import withPreventRerender from 'src/utils/hoc/withPreventRerender';

interface TimerControlsProps {
    timerType: 'pomidor' | 'break';
    timerState: 'start' | 'pause' | 'stop';
    handleClickStart: () => void;
    handleClickPause: () => void;
    handleClickStop: () => void;
    handleClickBreakSkip: () => void;
    timerComplete: boolean;
}

const TimerControls: React.FC<TimerControlsProps> = ({
    timerType,
    timerState,
    handleClickStart,
    handleClickPause,
    handleClickStop,
    handleClickBreakSkip,
    timerComplete,
}) => {
    return (
        <div className={styles.timerBoxBtnBox}>
            {timerType === 'pomidor' ? (
                <>
                    {timerState === 'stop' || timerState === 'pause' ? (
                        <button
                            className={styles.timerBoxBtnBoxStartBtn}
                            onClick={handleClickStart}
                            disabled={timerComplete}
                        >
                            Старт
                        </button>
                    ) : (
                        <button
                            className={styles.timerBoxBtnBoxStartBtn}
                            onClick={handleClickPause}
                            disabled={timerComplete}
                        >
                            Пауза
                        </button>
                    )}
                    <button
                        className={styles.timerBoxBtnBoxStopBtn}
                        onClick={handleClickStop}
                        disabled={timerState === 'stop' || timerComplete}
                    >
                        Стоп
                    </button>
                </>
            ) : (
                <button className={styles.timerBoxBtnBoxStopBtn} onClick={handleClickBreakSkip} itemType={timerType}>
                    Пропустить
                </button>
            )}
        </div>
    );
};

export default withPreventRerender(TimerControls);
