import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import { RootState } from '../../state/store';
// import { IUserSettingsData } from '../../state/userSettings/action';
// import { PomidoroItem } from './PomidoroItem';
import styles from './PomidoroList.module.scss';
import { AppDispatch, RootState } from '../../../redux/store';
import PomidoroItem from './PomidoroItem/PomidoroItem';
import { setCurrentTimer } from 'src/redux/services/currentTimer';
// import { currentTimerAction } from '../../state/currentTimer/action';

export interface IItem {
    id: number;
    user_id: number;
    descr: string;
    pomidors: number;
    current_pomidor_timer: number;
    current_pomidor: number;
    current_break_timer: number;
    current_break: number;
    current_timer: string;
    timer_complete: boolean;
}

const PomidoroList = () => {
    const [time, setTime] = useState('');
    const { data, loading, error } = useSelector((state: RootState) => state.pomidoro);
    const { settingsData, settingsLoading, settingsError } = useSelector((state: RootState) => state.userSettings);
    const dispatch = useDispatch<AppDispatch>();

    const list = data;

    useEffect(() => {
        let totalTime = list.reduce((a, b) => {
            return a + b.pomidors;
        }, 0);

        setTime(new Date(totalTime * settingsData.timer_duration * 60 * 1000).toISOString().substring(11, 16));
        dispatch(setCurrentTimer(list[0]));
    }, [list, settingsData.timer_duration]);

    return (
        <>
            {list.length > 0 && (
                <>
                    <ul className={styles.pomodoroList}>
                        {list.map((item) => (
                            <PomidoroItem key={item.id} item={item} list={list} />
                        ))}
                    </ul>
                    <p className={styles.pomodoroTotalTime}>
                        {time[1] === '0'
                            ? `${time.substring(3)} мин`
                            : `${time.substring(0, 2)} час ${time.substring(3)} мин`}
                    </p>
                </>
            )}
        </>
    );
};

export default PomidoroList;
