import React from 'react';
import styles from './TimerHeader.module.scss';
import { Pomidoro } from '@redux/services/pomidoro';
import withPreventRerender from 'src/utils/hoc/withPreventRerender';

interface TimerHeaderProps {
    timerType: 'pomidor' | 'break';
    data: Pomidoro;
    createBreakTitle: () => string;
}

const TimerHeader: React.FC<TimerHeaderProps> = ({ timerType, data, createBreakTitle }) => {
    return (
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
    );
};

export default withPreventRerender(TimerHeader);
