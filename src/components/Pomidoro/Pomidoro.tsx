'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Pomidoro.module.scss';
import TextBlock from './TextBlock/TextBlock';
import PomidoroList from './PomidoroList/PomidoroList';
import CreatePomidorForm from './CreqtePomidoroForm/CreatePomidoroForm';
import TimerBox from '@components/TimerBox/TimerBox';
import { AppDispatch, RootState } from '@redux/store';
import { fetchPomidoroList } from '@redux/services/pomidoro';

const Pomidoro = () => {
    const data = useSelector((state: RootState) => state.currentTimer.data);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPomidoroList());
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.mainFirstCol}>
                <TextBlock />
                <div className={styles.mainFirstColControlsBlock}>
                    <CreatePomidorForm />
                    <PomidoroList />
                </div>
            </div>
            {data.pomidors > 0 && <TimerBox />}
        </main>
    );
};

export default Pomidoro;
