'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Pomidoro.module.scss';
import TextBlock from './TextBlock/TextBlock';
import PomidoroList from './PomidoroList/PomidoroList';
import CreatePomidorForm from './CreqtePomidoroForm/CreatePomidoroForm';
import TimerBox from '@components/TimerBox/TimerBox';
import { AppDispatch } from '@redux/store';
import { fetchPomidoroList } from '@redux/services/pomidoro';

const Pomidoro = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPomidoroList());
    }, [dispatch]);

    return (
        <main className={styles.main}>
            <div className={styles.firstCol}>
                <TextBlock />
                <CreatePomidorForm />
                <PomidoroList />
            </div>
            <TimerBox />
        </main>
    );
};

export default Pomidoro;
