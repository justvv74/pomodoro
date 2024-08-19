import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PomidoroList.module.scss';
import { AppDispatch, RootState } from '../../../redux/store';
import PomidoroItem from './PomidoroItem/PomidoroItem';
import { setCurrentTimer } from 'src/redux/services/currentTimer';

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
    const data = useSelector((state: RootState) => state.pomidoro.data);
    const { settingsData } = useSelector((state: RootState) => state.userSettings);
    const dispatch = useDispatch<AppDispatch>();

    const totalTime = useMemo(() => {
        if (data.length === 0) return '';

        const totalMinutes = data.reduce((acc, item) => acc + item.pomidors * settingsData.timer_duration, 0);
        const totalMilliseconds = totalMinutes * 60 * 1000;
        return new Date(totalMilliseconds).toISOString().substring(11, 16);
    }, [data, settingsData.timer_duration]);

    useEffect(() => {
        if (data.length > 0) {
            dispatch(setCurrentTimer(data[0]));
        }
    }, [data, settingsData, dispatch]);

    const formattedTime = useMemo(() => {
        if (!totalTime) return '';
        const hours = totalTime.substring(0, 2);
        const minutes = totalTime.substring(3);
        return hours === '00' ? `${minutes} мин` : `${parseInt(hours, 10)} час ${minutes} мин`;
    }, [totalTime]);

    if (data.length === 0) return null;

    return (
        <>
            <ul className={styles.pomodoroList}>
                {data.map((item) => (
                    <PomidoroItem key={item.id} item={item} list={data} />
                ))}
            </ul>
            <p className={styles.pomodoroTotalTime}>{formattedTime}</p>
        </>
    );
};

export default PomidoroList;
