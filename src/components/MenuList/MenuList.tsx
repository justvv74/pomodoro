import { useRef } from 'react';

import styles from './MenuList.module.scss';
import Logout from './Logout/Logout';
import UserSettings from './UserSettings/UserSettings';
import useOutsideClick from 'src/hooks/useOutsideClick';

interface IMenuList {
    handleClose: () => void;
    username: string;
    settingsModalOpen: (e: boolean) => void;
}

const MenuList = ({ handleClose, username, settingsModalOpen }: IMenuList) => {
    const ref = useRef<HTMLUListElement>(null);

    useOutsideClick(ref, handleClose);

    return (
        <ul className={styles.list} ref={ref}>
            <li className={styles.listItem}>{username}</li>
            <li className={styles.listItemDelimiter}></li>
            <UserSettings settingsModalOpen={settingsModalOpen} handleClose={handleClose} />
            <li className={styles.listItemDelimiter}></li>
            <Logout />
        </ul>
    );
};

export default MenuList;
