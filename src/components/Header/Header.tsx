'use client';

import logo from '@images/logo.png';
import styles from './Header.module.scss';
import Image from 'next/image';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import MessageModal from '@components/MessageModal/MessageModal';
import { getUserDataAsync } from '@redux/services/userData';
import { getUserSettingsAsync } from '@redux/services/userSettings';

const Header = () => {
    const { message } = useSelector((state: RootState) => state.systemMessage);
    const dispatch = useDispatch<AppDispatch>();

    useLayoutEffect(() => {
        dispatch(getUserDataAsync());
        dispatch(getUserSettingsAsync());
    }, [dispatch]);

    return (
        <header className={styles.header}>
            <Image src={logo} alt="Logo" />
            <HeaderMenu />
            {message && <MessageModal message={message} />}
        </header>
    );
};

export default Header;
