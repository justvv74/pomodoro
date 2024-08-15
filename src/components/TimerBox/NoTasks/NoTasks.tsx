import styles from './NoTasks.module.scss';
import img from '../../../assets/images/pomidor.png';
import Image from 'next/image';

const NoTasks = () => {
    return (
        <div className={styles.noTasks}>
            <Image className={styles.img} src={img} alt="Помидор" />
            <p className={styles.text}>Для начала работы создайте задачу</p>
        </div>
    );
};

export default NoTasks;
