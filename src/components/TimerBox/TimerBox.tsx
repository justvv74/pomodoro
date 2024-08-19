import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './TimerBox.module.scss';
import NoTasks from './NoTasks/NoTasks';
import timerEnd from '../../assets/audio/timer-end.mp3';
import { AppDispatch, RootState } from '@redux/store';
import { fetchPomidoroList, Pomidoro, setManualLoading } from '@redux/services/pomidoro';
import { increasePomidorCount } from '@services/frontend/changeTimers';
import { setISystemMessage } from '@redux/services/systemMessage';
import useTimer from '@hooks/useTimer';
import { updatePomidor } from '@services/frontend/updateTimer';
import TimerDisplay from './TimerDisplay';

const TimerBox = () => {
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const pomidoroList = useSelector((state: RootState) => state.pomidoro.data);
    const loading = useSelector((state: RootState) => state.pomidoro.loading);
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);
    const [timerType, setTimerType] = useState<'pomidor' | 'break'>('pomidor');
    const dispatch = useDispatch<AppDispatch>();

    const { time, startTimer, pauseTimer, resetTimer, timerState, setTimerState } = useTimer(
        timerType === 'pomidor' ? data.current_pomidor_timer : data.current_break_timer,
        timerType
    );
    const isFirstRenderOne = useRef<boolean>(true);
    const isFirstRenderTwo = useRef<boolean>(true);
    const isFirstRenderThree = useRef<boolean>(true);
    const SECONDS_IN_MINUTE: 60 = 60;

    console.log('currentTimer', data);
    console.log('timerState', timerState);

    useLayoutEffect(() => {
        if (data.timer_complete) {
        }
    });

    useEffect(() => {
        if (isFirstRenderThree.current) {
            isFirstRenderThree.current = false;
            return;
        }
        console.log('useEffect', data.current_pomidor_timer !== settings.timer_duration * SECONDS_IN_MINUTE);

        setTimerType(data.current_timer);
    }, [data]);

    useEffect(() => {
        if (data.id === 0 || data.user_id === 0 || data.pomidors === 0) {
            return;
        }

        if (isFirstRenderOne.current) {
            isFirstRenderOne.current = false;
            return;
        }

        if (time === 0) {
            if (settings.alerts) {
                const audio = new Audio(timerEnd);
                audio.play();
            }

            changetimerType();
        }
    }, [time]);

    const changetimerType = () => {
        console.log('changetimerType');
        dispatch(setManualLoading(true));

        const breakDuration =
            data.current_break % settings.before_big_break === 0
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
            updatePomidor(data.id, body).then(() => {
                setTimerType(choiseTimerType);
                dispatch(fetchPomidoroList());
            });
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    useEffect(() => {
        if (isFirstRenderTwo.current && !loading) {
            isFirstRenderTwo.current = false;
            return;
        }

        if (data.timer_complete) {
            return;
        }

        if (settings.auto_start && timerType === 'pomidor' && !loading) {
            startTimer();
        }
        if (timerType === 'break' && !loading) {
            startTimer();
        }
    }, [timerType, loading]);

    const handleClickStart = () => {
        startTimer();
    };

    const handleClickPause = async () => {
        pauseTimer();
        const body: Partial<Pomidoro> = {
            current_pomidor_timer: time,
            current_timer: 'pomidor',
        };
        try {
            updatePomidor(data.id, body).then(() => {
                dispatch(fetchPomidoroList());
            });
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    const handleClickStop = async () => {
        resetTimer();

        const body: Partial<Pomidoro> = {
            current_pomidor_timer: settings.timer_duration * SECONDS_IN_MINUTE,
        };
        try {
            updatePomidor(data.id, body).then(() => {
                dispatch(fetchPomidoroList());
            });
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    const handleClickBreakSkip = async () => {
        resetTimer();
        changetimerType();
    };

    const createBreakTitle = () => {
        const title =
            data.current_break % settings.before_big_break === 0
                ? `Перерыв ${data.current_break}`
                : `Большой перерыв ${data.current_break}`;
        return title;
    };

    return (
        <div className={styles.timerBox}>
            <div className={styles.timerBoxHeader} itemType={timerType}>
                <span className={styles.timerBoxHeaderTitle}>{data ? data.descr : ''}</span>
                {timerType === 'pomidor' ? (
                    <span className={styles.timerBoxHaderTask}>{`Помидор ${
                        data ? (data.current_pomidor > data.pomidors ? data.pomidors : data.current_pomidor) : ''
                    } / ${data ? data.pomidors : ''}`}</span>
                ) : (
                    <span className={styles.timerBoxHeaderTask}>{createBreakTitle()}</span>
                )}
            </div>
            <div className={styles.timerBoxContent}>
                {' '}
                {pomidoroList.length > 0 ? (
                    <>
                        <TimerDisplay timer={time} itemType={timerType} />
                        {data && data.timer_complete && (
                            <p className={styles.timerBoxDescrRow}>
                                <span className={styles.timerBoxDescrTitle}>Задача выполнена!</span>
                            </p>
                        )}
                        <div className={styles.timerBoxBtnBox}>
                            {timerType === 'pomidor' ? (
                                <>
                                    {timerState === 'stop' || timerState === 'pause' ? (
                                        <button
                                            className={styles.timerBoxBtnBoxStartBtn}
                                            onClick={handleClickStart}
                                            disabled={data && data.timer_complete}
                                        >
                                            Старт
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.timerBoxBtnBoxStartBtn}
                                            onClick={handleClickPause}
                                            disabled={data && data.timer_complete}
                                        >
                                            Пауза
                                        </button>
                                    )}
                                    <button
                                        className={styles.timerBoxBtnBoxStopBtn}
                                        onClick={handleClickStop}
                                        disabled={timerState === 'stop' || (data && data.timer_complete)}
                                    >
                                        Стоп
                                    </button>
                                </>
                            ) : (
                                <button
                                    className={styles.timerBoxBtnBoxStopBtn}
                                    onClick={handleClickBreakSkip}
                                    itemType={timerType}
                                >
                                    Пропустить
                                </button>
                            )}

                            {/* {loading && <div className="spinner"></div>} */}
                        </div>
                    </>
                ) : (
                    <NoTasks />
                )}{' '}
            </div>
        </div>
    );
};

export default TimerBox;
