// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import styles from './TimerBox.module.scss';
// import NoTasks from './NoTasks/NoTasks';
// import timerEnd from '../../assets/audio/timer-end.mp3';
// import { AppDispatch, RootState } from '@redux/store';
// import { fetchPomidoroList } from '@redux/services/pomidoro';
// import { setPomidorId } from '@redux/services/pomidoroId';

// const TimerBox = () => {
//     const data = useSelector((state: RootState) => state.currentTimer.data);
//     const pomidorId = useSelector((state: RootState) => state.pomidorId.id);
//     const loading = useSelector((state: RootState) => state.pomidoro.loading);
//     const settings = useSelector((state: RootState) => state.userSettings.settingsData);
//     const [timer, setTimer] = useState(settings.timer_duration * 60);
//     const [start, setStart] = useState<any>(null);
//     const [pauseTimer, setPauseTimer] = useState(false);
//     const [AbreakTimer, setABreakTimer] = useState(settings.break_duration * 60);
//     const [ABreak, setABreak] = useState<any>(null);
//     const [pauseBreak, setPauseBreak] = useState<any>(false);
//     const [itemType, setItemType] = useState('');
//     const [reload, setReload] = useState(0);
//     const dispatch = useDispatch<AppDispatch>();
//     const [play, setPlay] = useState(false);

//     useEffect(() => {
//         setReload(() => reload + 1);
//         if (data) {
//             setTimer(data.current_pomidor_timer);
//         }

//         clearInterval(start);
//         setStart(null);
//         clearInterval(ABreak);
//         setABreak(null);
//         setPauseBreak(false);
//         setPauseTimer(false);
//         setItemType('');

//         if (start !== null) {
//             setItemType('pomidor');
//         }

//         if (ABreak !== null) {
//             setItemType('break');
//         }

//         if (data && data.current_timer === 'break') {
//             if (ABreak === null) {
//                 setABreak(1);
//             }
//             if (data && data.current_break % settings.before_big_break === 0 && data.current_break !== 0) {
//                 setABreakTimer(settings.big_break_duration * 60);
//             } else {
//                 setABreakTimer(data.current_break_timer);
//             }
//         }
//         console.log('reload123123', data, AbreakTimer);
//     }, [data, pomidorId, settings]);

//     useEffect(() => {
//         setReload(() => reload + 1);

//         setTimer(settings.timer_duration * 60);
//         setABreakTimer(settings.break_duration);
//     }, [settings]);

//     useEffect(() => {
//         if (data) {
//             clearInterval(start);
//             setStart(null);
//             setABreakTimer(data.current_break_timer);
//             clearInterval(ABreak);
//             setABreak(null);
//             setPauseBreak(false);
//             setPauseTimer(false);
//         }
//     }, [pomidorId]);

//     function handleClickStart() {
//         if (start === null) {
//             setStart(setInterval(() => setTimer((oldTimer) => oldTimer - 1), 1000));
//         }
//         setItemType('pomidor');
//     }

//     const minutes = (timerName: number) => {
//         return String(Math.floor(timerName / 60)).length === 1
//             ? `0${Math.floor(timerName / 60)}`
//             : Math.floor(timerName / 60);
//     };

//     const seconds = (timerName: number) => {
//         return String(timerName - Number(minutes(timerName)) * 60).length === 1
//             ? `0${timerName - Number(minutes(timerName)) * 60}`
//             : timerName - Number(minutes(timerName)) * 60;
//     };

//     function handleClickPause() {
//         clearInterval(start);
//         setPauseTimer(true);

//         axios
//             .patch(
//                 `api/timers/${data.id}/update`,
//                 {
//                     current_pomidor_timer: timer,
//                     current_timer: 'pomidor',
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             )
//             .then((res) => {
//                 dispatch(fetchPomidoroList());
//             })
//             .catch((err) => console.log(err));
//     }

//     function handleClickPauseCancel() {
//         setStart(setInterval(() => setTimer((oldTimer) => oldTimer - 1), 1000));
//         setPauseTimer(false);
//     }

//     function handleClickStop() {
//         clearInterval(start);
//         setStart(null);
//         setItemType('');

//         axios
//             .patch(
//                 `api/timer/${data.id}/update`,
//                 {
//                     current_pomidor_timer: settings.timer_duration * 60,
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             )
//             .then((res) => {
//                 console.log(res);
//                 dispatch(fetchPomidoroList());
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }

//     function handleClickComplete() {
//         clearInterval(start);
//         setStart(null);
//         setPauseTimer(false);

//         if (settings.alerts) {
//             setPlay(true);
//         }

//         // axios
//         //     .patch(
//         //         `api/timers/${data?.id}/update`,
//         //         {
//         //             current_pomidor_timer: settings.timer_duration * 60,
//         //             current_pomidor: data.current_pomidor + 1,
//         //             current_break_timer: data.current_break_timer,
//         //             current_break: data.current_break + 1,
//         //             current_timer: data.current_pomidor !== data.pomidors ? 'break' : 'pomidor',
//         //             timer_complete: data.current_pomidor === data.pomidors ? true : false,
//         //         },
//         //         {
//         //             withCredentials: true,
//         //         }
//         //     )
//         //     .then((res) => {
//         //         dispatch(fetchPomidoroList());
//         //         if (data.current_pomidor === data.pomidors) {
//         //             setItemType('');
//         //         } else {
//         //             setABreak(setInterval(() => setABreakTimer((oldTimer) => oldTimer - 1), 1000));
//         //             setItemType('break');
//         //         }
//         //     })
//         //     .catch((err) => console.log(err));
//     }

//     function handleClickBreakSkip() {
//         clearInterval(ABreak);
//         setABreak(null);
//         setPauseBreak(false);
//         console.log('data', data);
//         if (settings.alerts) {
//             setPlay(true);
//         }

//         // axios
//         //     .patch(
//         //         `api/timer/${data?.id}/update`,
//         //         {
//         //             current_pomidor_timer: settings.timer_duration * 60,
//         //             current_break_timer: settings.break_duration * 60,
//         //             current_timer: 'pomidor',
//         //         },
//         //         {
//         //             withCredentials: true,
//         //         }
//         //     )
//         //     .then((res) => {
//         //         console.log(res);
//         //         dispatch(fetchPomidoroList());
//         //         if (settings.auto_start) {
//         //             setStart(setInterval(() => setTimer((oldTimer) => oldTimer - 1), 1000));
//         //             setItemType('pomidor');
//         //         } else {
//         //             setStart(null);
//         //             setItemType('');
//         //         }
//         //     })
//         //     .catch((err) => console.log(err));
//     }

//     function handleClickBreakPause() {
//         clearInterval(ABreak);
//         setPauseBreak(true);

//         axios
//             .patch(
//                 `api/timers/${data.id}/update`,
//                 {
//                     current_break_timer: AbreakTimer,
//                     current_break: data.current_break,
//                     current_timer: 'break',
//                 },
//                 {
//                     withCredentials: true,
//                 }
//             )
//             .then((res) => {
//                 console.log(res);
//                 dispatch(fetchPomidoroList());
//             })
//             .catch((err) => console.log(err));
//     }

//     function handleClickBreakStart() {
//         setABreak(setInterval(() => setABreakTimer((oldTimer) => oldTimer - 1), 1000));
//         setPauseBreak(false);
//         setItemType('break');
//     }

//     useEffect(() => {
//         if (timer === 0) {
//             handleClickComplete();
//         }

//         if (play) {
//             setTimeout(() => {
//                 setPlay(false);
//             }, 1000);
//         }
//     }, [timer]);

//     useEffect(() => {
//         if (AbreakTimer === 0) {
//             handleClickBreakSkip();
//         }

//         if (play) {
//             setTimeout(() => {
//                 setPlay(false);
//             }, 1000);
//         }
//     }, [AbreakTimer]);

//     async function hanleClickUp() {
//         if (data.pomidors < 48) {
//             axios
//                 .patch(
//                     `api/timers/${data.id}/update`,
//                     {
//                         pomidors: data.pomidors + 1,
//                         current_pomidor_timer: timer,
//                         current_break_timer: AbreakTimer,
//                     },
//                     {
//                         withCredentials: true,
//                     }
//                 )
//                 .then((res) => {
//                     console.log(res);
//                     dispatch(setPomidorId(data.id));
//                     dispatch(fetchPomidoroList());
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }

//     return (
//         <div className={styles.timerBox}>
//             <div className={styles.timerBoxHeader} itemType={itemType}>
//                 <span className={styles.timerBoxHeaderTitle}>{data ? data.descr : ''}</span>
//                 {ABreak === null && (
//                     <span className={styles.timerBoxHaderTask}>{`Помидор ${
//                         data ? (data.current_pomidor > data.pomidors ? data.pomidors : data.current_pomidor) : ''
//                     } / ${data ? data.pomidors : ''}`}</span>
//                 )}
//                 {ABreak !== null && (
//                     <span className={styles.timerBoxHeaderTask}>{`Перерыв ${data ? data.current_break : ''}`}</span>
//                 )}
//             </div>
//             <div className={styles.timerBoxTimeRow}>
//                 {ABreak === null && (
//                     <span className={styles.timerBoxTimeRowTime} itemType={itemType}>{`${minutes(timer)}:${seconds(
//                         timer
//                     )}`}</span>
//                 )}
//                 {ABreak !== null && (
//                     <span className={styles.timerBoxTimeRowTime} itemType={itemType}>{`${minutes(
//                         AbreakTimer
//                     )}:${seconds(AbreakTimer)}`}</span>
//                 )}
//                 {data && !data.timer_complete && (
//                     <button className={styles.timerBoxAddPomidor} onClick={hanleClickUp}>
//                         <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <circle cx="25" cy="25" r="25" fill="currentColor" />
//                             <path
//                                 d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
//                                 fill="white"
//                             />
//                         </svg>
//                     </button>
//                 )}
//             </div>
//             {data && data.timer_complete && (
//                 <p className={styles.timerBoxDescrRow}>
//                     <span className={styles.timerBoxDescrTitle}>Задача выполнена!</span>
//                 </p>
//             )}
//             <div className={styles.timerBoxBtnBox}>
//                 {start === null && ABreak === null && (
//                     <button
//                         className={styles.timerBoxBtnBoxStartBtn}
//                         onClick={handleClickStart}
//                         disabled={data && data.timer_complete}
//                     >
//                         Старт
//                     </button>
//                 )}
//                 {start !== null && pauseTimer !== true && (
//                     <button className={styles.timerBoxBtnBoxStartBtn} onClick={handleClickPause}>
//                         Пауза
//                     </button>
//                 )}
//                 {ABreak !== null && pauseBreak === false && ABreak !== 1 && (
//                     <button className={styles.timerBoxBtnBoxStartBtn} onClick={handleClickBreakPause}>
//                         ПаузаG
//                     </button>
//                 )}
//                 {pauseTimer === true && (
//                     <button className={styles.timerBoxBtnBoxStartBtn} onClick={handleClickPauseCancel}>
//                         Продолжить
//                     </button>
//                 )}
//                 {pauseBreak === true && (
//                     <button className={styles.timerBoxBtnBoxStartBtn} onClick={handleClickBreakStart}>
//                         Продолжить
//                     </button>
//                 )}
//                 {ABreak === 1 && pauseBreak === false && ABreak !== null && (
//                     <button className={styles.timerBoxBtnBoxStartBtn} onClick={handleClickBreakStart}>
//                         Продолжить
//                     </button>
//                 )}
//                 {ABreak === null && pauseTimer !== true && (
//                     <button
//                         className={styles.timerBoxBtnBoxStopBtn}
//                         onClick={handleClickStop}
//                         disabled={(data && data.timer_complete) || start === null}
//                         itemType={itemType}
//                     >
//                         Стоп
//                     </button>
//                 )}
//                 {pauseTimer === true && (
//                     <button className={styles.timerBoxBtnBoxStopBtn} onClick={handleClickComplete} itemType={itemType}>
//                         Сделано
//                     </button>
//                 )}
//                 {ABreak !== null && (
//                     <button className={styles.timerBoxBtnBoxStopBtn} onClick={handleClickBreakSkip} itemType={itemType}>
//                         Пропустить
//                     </button>
//                 )}

//                 {!data && !loading && <NoTasks />}
//                 {loading && <div className="spinner"></div>}
//                 {/* {play && <audio src={timerEnd} autoPlay></audio>} */}
//             </div>
//         </div>
//     );
// };

// export default TimerBox;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import styles from './TimerBox.module.scss';
// import NoTasks from './NoTasks/NoTasks';
// import timerEnd from '../../assets/audio/timer-end.mp3';
// import { AppDispatch, RootState } from '@redux/store';
// import { fetchPomidoroList } from '@redux/services/pomidoro';
// import { setPomidorId } from '@redux/services/pomidoroId';

// // Хук для управления таймером
// const useTimer = (initialTime: number, onComplete: () => void) => {
//     const [time, setTime] = useState(initialTime);
//     const [intervalId, setIntervalId] = useState<number | null>(null);

//     const start = () => {
//         if (intervalId === null) {
//             const id = window.setInterval(() => {
//                 setTime((prevTime) => prevTime - 1);
//             }, 1000);
//             setIntervalId(id);
//         }
//     };

//     const pause = () => {
//         if (intervalId !== null) {
//             clearInterval(intervalId);
//             setIntervalId(null);
//         }
//     };

//     const reset = (newTime: number) => {
//         pause();
//         setTime(newTime);
//     };

//     useEffect(() => {
//         if (time <= 0 && intervalId !== null) {
//             pause();
//             onComplete();
//         }
//     }, [time]);

//     return { time, start, pause, reset, intervalId };
// };

// const TimerDisplay = ({ time }: { time: number }) => {
//     const minutes = String(Math.floor(time / 60)).padStart(2, '0');
//     const seconds = String(time % 60).padStart(2, '0');
//     return <span className={styles.timerBoxTimeRowTime}>{`${minutes}:${seconds}`}</span>;
// };

// const TimerControls = ({
//     itemType,
//     isPomodoro,
//     isPaused,
//     onStart,
//     onPause,
//     onStop,
//     onComplete,
//     onBreakStart,
//     onBreakPause,
//     onBreakSkip,
//     onBreakContinue,
// }: {
//     itemType: string;
//     isPomodoro: boolean;
//     isPaused: boolean;
//     onStart: () => void;
//     onPause: () => void;
//     onStop: () => void;
//     onComplete: () => void;
//     onBreakStart: () => void;
//     onBreakPause: () => void;
//     onBreakSkip: () => void;
//     onBreakContinue: () => void;
// }) => {
//     return (
//         <div className={styles.timerBoxBtnBox}>
//             {isPomodoro && (
//                 <>
//                     {!isPaused && (
//                         <>
//                             <button className={styles.timerBoxBtnBoxStartBtn} onClick={onPause}>
//                                 Пауза
//                             </button>
//                             <button className={styles.timerBoxBtnBoxStopBtn} onClick={onStop} itemType={itemType}>
//                                 Стоп
//                             </button>
//                         </>
//                     )}
//                     {isPaused && (
//                         <>
//                             <button className={styles.timerBoxBtnBoxStartBtn} onClick={onStart}>
//                                 Продолжить
//                             </button>
//                             <button className={styles.timerBoxBtnBoxStopBtn} onClick={onComplete} itemType={itemType}>
//                                 Сделано
//                             </button>
//                         </>
//                     )}
//                 </>
//             )}
//             {!isPomodoro && (
//                 <>
//                     {!isPaused && (
//                         <>
//                             <button className={styles.timerBoxBtnBoxStartBtn} onClick={onBreakPause}>
//                                 Пауза
//                             </button>
//                             <button className={styles.timerBoxBtnBoxStopBtn} onClick={onBreakSkip} itemType={itemType}>
//                                 Пропустить
//                             </button>
//                         </>
//                     )}
//                     {isPaused && (
//                         <>
//                             <button className={styles.timerBoxBtnBoxStartBtn} onClick={onBreakContinue}>
//                                 Продолжить
//                             </button>
//                             <button className={styles.timerBoxBtnBoxStopBtn} onClick={onBreakSkip} itemType={itemType}>
//                                 Пропустить
//                             </button>
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// const TimerBox = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const data = useSelector((state: RootState) => state.currentTimer.data);
//     const pomidorId = useSelector((state: RootState) => state.pomidorId.id);
//     const loading = useSelector((state: RootState) => state.pomidoro.loading);
//     const settings = useSelector((state: RootState) => state.userSettings.settingsData);

//     const [play, setPlay] = useState(false);
//     const [itemType, setItemType] = useState('');

//     const pomodoroTimer = useTimer(settings.timer_duration * 60, handlePomodoroComplete);
//     const breakTimer = useTimer(settings.break_duration * 60, handleBreakComplete);

//     useEffect(() => {
//         if (data) {
//             pomodoroTimer.reset(data.current_pomidor_timer);
//             breakTimer.reset(data.current_break_timer);
//             setItemType(data.current_timer);
//         }
//     }, [data, pomidorId, settings]);

//     function handlePomodoroComplete() {
//         // Действия при завершении помидора
//         if (settings.alerts) setPlay(true);
//         // Обновление данных и начало перерыва
//         axios
//             .patch(
//                 `api/timers/${data.id}/update`,
//                 {
//                     current_pomidor_timer: settings.timer_duration * 60,
//                     current_pomidor: data.current_pomidor + 1,
//                     current_break_timer: settings.break_duration * 60,
//                     current_timer: 'break',
//                     timer_complete: data.current_pomidor === data.pomidors,
//                 },
//                 { withCredentials: true }
//             )
//             .then(() => {
//                 dispatch(fetchPomidoroList());
//                 if (data.current_pomidor !== data.pomidors) {
//                     breakTimer.start();
//                     setItemType('break');
//                 }
//             })
//             .catch(console.log);
//     }

//     function handleBreakComplete() {
//         // Действия при завершении перерыва
//         axios
//             .patch(
//                 `api/timers/${data.id}/update`,
//                 {
//                     current_pomidor_timer: settings.timer_duration * 60,
//                     current_break_timer: settings.break_duration * 60,
//                     current_timer: 'pomidor',
//                 },
//                 { withCredentials: true }
//             )
//             .then(() => {
//                 dispatch(fetchPomidoroList());
//                 if (settings.auto_start) {
//                     pomodoroTimer.start();
//                     setItemType('pomidor');
//                 }
//             })
//             .catch(console.log);
//     }

//     return (
//         <div className={styles.timerBox}>
//             <div className={styles.timerBoxHeader} itemType={itemType}>
//                 <span className={styles.timerBoxHeaderTitle}>{data ? data.descr : ''}</span>
//                 <span className={styles.timerBoxHeaderTask}>{`Помидор ${data ? data.current_pomidor : ''} / ${
//                     data ? data.pomidors : ''
//                 }`}</span>
//             </div>
//             <div className={styles.timerBoxTimeRow}>
//                 {itemType === 'pomidor' && <TimerDisplay time={pomodoroTimer.time} />}
//                 {itemType === 'break' && <TimerDisplay time={breakTimer.time} />}
//             </div>
//             <TimerControls
//                 itemType={itemType}
//                 isPomodoro={itemType === 'pomidor'}
//                 isPaused={pomodoroTimer.intervalId === null}
//                 onStart={pomodoroTimer.start}
//                 onPause={pomodoroTimer.pause}
//                 onStop={pomodoroTimer.reset.bind(null, settings.timer_duration * 60)}
//                 onComplete={handlePomodoroComplete}
//                 onBreakStart={breakTimer.start}
//                 onBreakPause={breakTimer.pause}
//                 onBreakSkip={handleBreakComplete}
//                 onBreakContinue={breakTimer.start}
//             />
//             {loading && <div className="spinner"></div>}
//             {!data && !loading && <NoTasks />}
//             {play && <audio src={timerEnd} autoPlay />}
//         </div>
//     );
// };

// export default TimerBox;

// ------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchPomidoroList } from '@redux/services/pomidoro';
import { setPomidorId } from '@redux/services/pomidoroId';
import TimerDisplay from './TimerDisplay';
import ControlButtons from './ControlButtons';
import styles from './TimerBox.module.scss';
import NoTasks from './NoTasks/NoTasks';
import { usePomidorTimer } from '@hooks/usePomidorTimer';
import { useBreakTimer } from '@hooks/useBreakTimer';

const TimerBox: React.FC = () => {
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const pomidorId = useSelector((state: RootState) => state.pomidorId.id);
    const loading = useSelector((state: RootState) => state.pomidoro.loading);
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);
    const dispatch = useDispatch<AppDispatch>();

    const handleClickComplete = () => {
        pauseTimer();
        setItemType('');

        if (settings.alerts) {
            // Play alert sound
        }
    };

    const handleClickBreakSkip = () => {
        pauseBreak();
        resetTimer(settings.timer_duration);
        setItemType('pomidor');
    };

    const {
        timer,
        startTimer,
        pauseTimer,
        resetTimer,
        isRunning: isPomidorRunning,
    } = usePomidorTimer(settings.timer_duration, handleClickComplete);

    const {
        breakTimer,
        startBreak,
        pauseBreak,
        resetBreak,
        isRunning: isBreakRunning,
    } = useBreakTimer(settings.break_duration, handleClickBreakSkip);

    const [itemType, setItemType] = useState('');

    useEffect(() => {
        if (data) {
            resetTimer(data.current_pomidor_timer / 60);
            resetBreak(data.current_break_timer / 60);

            if (data.current_timer === 'break') {
                startBreak();
                setItemType('break');
            } else {
                startTimer();
                setItemType('pomidor');
            }
        }
    }, [data]);

    return (
        <div className={styles.timerBox}>
            <div className={styles.timerBoxHeader} itemType={itemType}>
                <span className={styles.timerBoxHeaderTitle}>{data?.descr}</span>
                {itemType === 'pomidor' && (
                    <span className={styles.timerBoxHeaderTask}>{`Помидор ${data?.current_pomidor || 1}`}</span>
                )}
            </div>

            <TimerDisplay timer={itemType === 'pomidor' ? timer : breakTimer} itemType={itemType} />

            <ControlButtons
                onStart={() => startTimer()}
                onPause={() => pauseTimer()}
                onResume={() => startTimer()}
                onStop={handleClickComplete}
                onComplete={handleClickComplete}
                isPomidorRunning={isPomidorRunning}
                isBreakRunning={isBreakRunning}
                isPomidorPaused={!isPomidorRunning && timer > 0}
                isBreakPaused={!isBreakRunning && breakTimer > 0}
            />
        </div>
    );
};

export default TimerBox;
