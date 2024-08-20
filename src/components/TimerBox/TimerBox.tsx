// import { MutableRefObject, useCallback, useRef, useState } from 'react';

// import { useSelector } from 'react-redux';
// import styles from './TimerBox.module.scss';
// import NoTasks from './NoTasks/NoTasks';
// import { RootState } from '@redux/store';
// import useTimer from '@hooks/useTimer';
// import TimerDisplay from './TimerDisplay/TimerDisplay';
// import TimerControls from './TimerControls/TimerControls';
// import TimerHeader from './TimerHeader/TimerHeader';
// import { useTimerLogic } from '@hooks/useTimerLogic';
// import { useTimerEffects } from '@hooks/useTimerEffects';

// const TimerBox = () => {
//     const data = useSelector((state: RootState) => state.currentTimer.data);
//     const pomidoroList = useSelector((state: RootState) => state.pomidoro.data);
//     const loading = useSelector((state: RootState) => state.pomidoro.loading);
//     const settings = useSelector((state: RootState) => state.userSettings.settingsData);

//     const [timerType, setTimerType] = useState<'pomidor' | 'break'>('pomidor');
//     const [initialTime, setInitialTime] = useState<number>(
//         timerType === 'pomidor' ? data.current_pomidor_timer : data.current_break_timer
//     );

//     const isFirstRenderTime = useRef<boolean>(true) as MutableRefObject<boolean>;
//     const isFirstRenderCurrentTimer = useRef<boolean>(true) as MutableRefObject<boolean>;
//     const isFirstRenderId = useRef<boolean>(true) as MutableRefObject<boolean>;

//     const { time, startTimer, pauseTimer, resetTimer, timerState } = useTimer(initialTime, timerType);

//     const { changetimerType, handleClickPause, handleClickStop } = useTimerLogic(
//         timerType,
//         time,
//         setTimerType,
//         startTimer,
//         pauseTimer,
//         resetTimer,
//         isFirstRenderCurrentTimer
//     );

//     useTimerEffects(
//         timerType,
//         startTimer,
//         setInitialTime,
//         loading,
//         isFirstRenderTime,
//         isFirstRenderId,
//         setTimerType,
//         pauseTimer,
//         time,
//         changetimerType
//     );

//     const createBreakTitle = useCallback(() => {
//         const title =
//             data.current_break % settings.before_big_break === 0
//                 ? `Большой перерыв ${data.current_break}`
//                 : `Перерыв ${data.current_break}`;
//         return title;
//     }, [data.current_break, settings.before_big_break]);

//     return (
//         <div className={styles.timerBox}>
//             <TimerHeader timerType={timerType} data={data} createBreakTitle={createBreakTitle} />
//             <div className={styles.timerBoxContent}>
//                 {' '}
//                 {pomidoroList.length > 0 ? (
//                     <>
//                         <TimerDisplay timer={time} itemType={timerType} />
//                         {data && data.timer_complete && (
//                             <p className={styles.timerBoxDescrRow}>
//                                 <span className={styles.timerBoxDescrTitle}>Задача выполнена!</span>
//                             </p>
//                         )}
//                         <TimerControls
//                             timerType={timerType}
//                             timerState={timerState}
//                             handleClickStart={startTimer}
//                             handleClickPause={handleClickPause}
//                             handleClickStop={handleClickStop}
//                             handleClickBreakSkip={changetimerType}
//                             timerComplete={data.timer_complete}
//                         />
//                     </>
//                 ) : (
//                     <NoTasks />
//                 )}{' '}
//             </div>
//         </div>
//     );
// };

// export default TimerBox;

import { MutableRefObject, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './TimerBox.module.scss';
import NoTasks from './NoTasks/NoTasks';
import { RootState } from '@redux/store';
import useTimer from '@hooks/useTimer';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TimerControls from './TimerControls/TimerControls';
import TimerHeader from './TimerHeader/TimerHeader';
import { useTimerLogic } from '@hooks/useTimerLogic';
import { useTimerEffects } from '@hooks/useTimerEffects';

const TimerBox: React.FC = () => {
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const pomidoroList = useSelector((state: RootState) => state.pomidoro.data);
    const loading = useSelector((state: RootState) => state.pomidoro.loading);
    const settings = useSelector((state: RootState) => state.userSettings.settingsData);

    const [timerType, setTimerType] = useState<'pomidor' | 'break'>('pomidor');
    const [initialTime, setInitialTime] = useState<number>(
        timerType === 'pomidor' ? data.current_pomidor_timer : data.current_break_timer
    );

    const isFirstRenderTime = useRef<boolean>(true);
    const isFirstRenderCurrentTimer = useRef<boolean>(true);
    const isFirstRenderId = useRef<boolean>(true);

    const { time, startTimer, pauseTimer, resetTimer, timerState } = useTimer(initialTime, timerType);

    const { changetimerType, handleClickPause, handleClickStop } = useTimerLogic(
        timerType,
        time,
        setTimerType,
        startTimer,
        pauseTimer,
        resetTimer,
        isFirstRenderCurrentTimer
    );

    useTimerEffects(
        timerType,
        startTimer,
        setInitialTime,
        loading,
        isFirstRenderTime,
        isFirstRenderId,
        setTimerType,
        pauseTimer,
        time,
        changetimerType
    );

    const createBreakTitle = useCallback(() => {
        const title =
            data.current_break % settings.before_big_break === 0
                ? `Большой перерыв ${data.current_break}`
                : `Перерыв ${data.current_break}`;
        return title;
    }, [data.current_break, settings.before_big_break]);

    return (
        <div className={styles.timerBox}>
            <TimerHeader timerType={timerType} data={data} createBreakTitle={createBreakTitle} />
            <div className={styles.timerBoxContent}>
                {pomidoroList.length > 0 ? (
                    <>
                        <TimerDisplay timer={time} itemType={timerType} />
                        {data && data.timer_complete && (
                            <p className={styles.timerBoxDescrRow}>
                                <span className={styles.timerBoxDescrTitle}>Задача выполнена!</span>
                            </p>
                        )}
                        <TimerControls
                            timerType={timerType}
                            timerState={timerState}
                            handleClickStart={startTimer}
                            handleClickPause={handleClickPause}
                            handleClickStop={handleClickStop}
                            handleClickBreakSkip={changetimerType}
                            timerComplete={data.timer_complete}
                        />
                    </>
                ) : (
                    <NoTasks />
                )}
            </div>
        </div>
    );
};

export default TimerBox;
