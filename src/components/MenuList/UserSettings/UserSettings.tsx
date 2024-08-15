import React from 'react';
import styles from './UserSettings.module.scss';

interface IUserSettings {
    settingsModalOpen: (e: boolean) => void;
    handleClose: () => void;
}

const UserSettings = ({ settingsModalOpen, handleClose }: IUserSettings) => {
    const handleClick = () => {
        settingsModalOpen(true);
        handleClose();
    };

    return (
        <li className={styles.item}>
            <button className={styles.itemBtn} onClick={handleClick}>
                Настройки
            </button>
        </li>
    );
};

export default UserSettings;
