import React from 'react';
import styles from './TimerDisplay.module.scss';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';
import withPreventRerender from 'src/utils/hoc/withPreventRerender';

interface TimerDisplayProps {
    timer: number;
    itemType: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, itemType }) => {
    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');

    return (
        <span className={styles.timerBoxTimeRowTime} itemType={itemType}>
            {minutes}:{seconds}
        </span>
    );
};

export default withPreventRerender(TimerDisplay);
