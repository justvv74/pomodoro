import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserSettingsModal.module.scss';
import { AppDispatch, RootState } from '@redux/store';
import { IUserSettingsData, updateUserSettingsAsync } from '@redux/services/userSettings';
import useOutsideClick from '@hooks/useOutsideClick';
import SettingControl from './SettingControl/SettingControl';
import { useUpdeteAllTimers } from '@hooks/useUpdeteAllTimers';

interface IUserSettingsModal {
    settingsModalOpen: (e: boolean) => void;
}

const UserSettingsModal = ({ settingsModalOpen }: IUserSettingsModal) => {
    const { settingsData, settingsLoading } = useSelector((state: RootState) => state.userSettings);
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<HTMLDivElement | null>(null);
    const { updateList } = useUpdeteAllTimers();

    const [settings, setSettingsData] = useState<IUserSettingsData>({
        ...settingsData,
    });

    const handleCloseModal = () => settingsModalOpen(false);

    const handleChangeSettingsData = (setting: keyof IUserSettingsData, value: number | boolean) => {
        setSettingsData((prevState) => ({
            ...prevState,
            [setting]: value,
        }));
    };

    useOutsideClick(ref, handleCloseModal);

    useEffect(() => {
        document.body.classList.add('noScroll');
        return () => document.body.classList.remove('noScroll');
    }, []);

    const handleClick = async () => {
        dispatch(updateUserSettingsAsync(settings)).then(() => {
            handleCloseModal();
            updateList();
        });
    };

    const node = document.getElementById('modal-root');
    if (!node) return null;

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal} ref={ref}>
                <h2 className={styles.modalTitle}>Настройки приложения Pomodoro</h2>
                <ul className={styles.modalList}>
                    <SettingControl
                        label="Продолжительность помидора, мин:"
                        value={settings.timer_duration}
                        minValue={1}
                        maxValue={35}
                        onChange={(value) => handleChangeSettingsData('timer_duration', value)}
                    />
                    <SettingControl
                        label="Продолжительность перерыва, мин:"
                        value={settings.break_duration}
                        minValue={2}
                        maxValue={7}
                        onChange={(value) => handleChangeSettingsData('break_duration', value)}
                    />
                    <SettingControl
                        label="Продолжительность большого перерыва, мин:"
                        value={settings.big_break_duration}
                        minValue={10}
                        maxValue={30}
                        onChange={(value) => handleChangeSettingsData('big_break_duration', value)}
                    />
                    <SettingControl
                        label="Количество помидоров до большого перерыва:"
                        value={settings.before_big_break}
                        minValue={2}
                        maxValue={10}
                        onChange={(value) => handleChangeSettingsData('before_big_break', value)}
                    />
                    <li className={styles.modalItem}>
                        <p className={styles.modalItemDescr}>Автоматически запускать таймер:</p>
                        <div className={styles.modalItemInputBox}>
                            <input
                                type="checkbox"
                                checked={settings.auto_start}
                                onChange={() => handleChangeSettingsData('auto_start', !settings.auto_start)}
                            />
                        </div>
                    </li>
                    <li className={styles.modalItem}>
                        <p className={styles.modalItemDescr}>Оповещения:</p>
                        <div className={styles.modalItemInputBox}>
                            <input
                                type="checkbox"
                                checked={settings.alerts}
                                onChange={() => handleChangeSettingsData('alerts', !settings.alerts)}
                            />
                        </div>
                    </li>
                </ul>
                <div className={styles.modalBtnBox}>
                    <button className={styles.modalBtnBoxBtnCancel} onClick={handleCloseModal}>
                        Отмена
                    </button>
                    <button className={styles.modalBtnBoxBtnSave} onClick={handleClick}>
                        Сохранить
                        {settingsLoading && <div className={styles.modalSpinner}></div>}
                    </button>
                </div>
            </div>
            <div className={styles.modalShadow}></div>
        </>,
        node
    );
};

export default UserSettingsModal;
