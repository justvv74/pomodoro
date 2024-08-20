import { useEffect } from 'react';
import styles from './MessageModal.module.scss';
import { setISystemMessage } from '@redux/services/systemMessage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/store';

interface IMessageModal {
    message: string;
}

const MessageModal = ({ message }: IMessageModal) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setISystemMessage(''));
        }, 6000);
    }, [dispatch]);

    return (
        <div className={styles.messageModal}>
            <p className={styles.messageModalText}>{message}</p>
        </div>
    );
};

export default MessageModal;
