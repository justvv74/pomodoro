import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PomidoroList.module.scss';
import { AppDispatch, RootState } from '../../../redux/store';
import PomidoroItem from './PomidoroItem/PomidoroItem';
import { setCurrentTimer } from 'src/redux/services/currentTimer';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';
import { setPomidoroList } from '@redux/services/pomidoro';
import { sortPomidoroList } from 'src/utils/sortPomidoroList';

const PomidoroList = () => {
    const data = useSelector((state: RootState) => state.pomidoro.data);
    const currentPomidor = useSelector((state: RootState) => state.currentTimer.data);
    const { settingsData } = useSelector((state: RootState) => state.userSettings);
    const dispatch = useDispatch<AppDispatch>();

    const totalTime = useMemo(() => {
        if (data.length === 0) return '';

        const totalMinutes = data.reduce((acc, item) => acc + item.pomidors * settingsData.timer_duration, 0);
        const totalMilliseconds = totalMinutes * SECONDS_IN_MINUTE * 1000;
        return new Date(totalMilliseconds).toISOString().substring(11, 16);
    }, [data, settingsData.timer_duration]);

    useEffect(() => {
        if (data.length > 0) {
            dispatch(setCurrentTimer(data[0]));
        }
    }, [data, settingsData, dispatch]);

    useEffect(() => {
        const sortedList = sortPomidoroList([...data], currentPomidor.id, currentPomidor);

        dispatch(setPomidoroList(sortedList));
    }, [currentPomidor]);

    const formattedTime = useMemo(() => {
        if (!totalTime) return '';
        const hours = totalTime.substring(0, 2);
        const minutes = totalTime.substring(3);
        return hours === '00' ? `${minutes} мин` : `${parseInt(hours, 10)} час ${minutes} мин`;
    }, [totalTime]);

    if (data.length === 0) return null;

    return (
        <div>
            <ul className={styles.pomodoroList}>
                {data.map((item) => (
                    <PomidoroItem key={item.id} item={item} list={data} />
                ))}
            </ul>
            <p className={styles.pomodoroTotalTime}>{formattedTime}</p>
        </div>
    );
};

export default PomidoroList;
