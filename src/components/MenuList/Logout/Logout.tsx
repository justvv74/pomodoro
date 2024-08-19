import { useDispatch } from 'react-redux';
import styles from './Logout.module.scss';
import axios, { AxiosError } from 'axios';
import { AppDispatch } from '@redux/store';
import { setISystemMessage } from '@redux/services/systemMessage';
import { logout } from '@services/frontend/userAuth';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const handleClick = async () => {
        console.log('handleClick');
        try {
            console.log('handleClick111');
            logout();
            console.log('handleClick2222');
            router.push('/start');
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    return (
        <li className={styles.item}>
            <button className={styles.itemBtn} onClick={handleClick}>
                Выйти
            </button>
        </li>
    );
};

export default Logout;
