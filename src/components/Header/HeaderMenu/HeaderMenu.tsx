import { useState } from 'react';
import styles from './HeaderMenu.module.scss';
import MenuList from '@components/MenuList/MenuList';
import UserSettingsModal from '@components/UserSettingsModal/UserSettingsModal';
import BurgerSvg from '@images/header/BurgerSvg';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

export function HeaderMenu() {
    const { username } = useSelector((state: RootState) => state.userData.userData);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const settingsModalOpen = (value: boolean) => {
        setIsSettingsModalOpen(value);
    };

    const handleClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
                <BurgerSvg />
            </button>
            {isMenuOpen && (
                <MenuList handleClose={handleClose} username={username} settingsModalOpen={settingsModalOpen} />
            )}

            {isSettingsModalOpen && <UserSettingsModal settingsModalOpen={settingsModalOpen} />}
        </>
    );
}
