import DownSvg from '@images/settingsModal/DownSvg';
import styles from './SettingControl.module.scss';
import UpSvg from '@images/settingsModal/UpSvg';

interface ISettingControlProps {
    label:
        | 'Продолжительность помидора, мин:'
        | 'Продолжительность перерыва, мин:'
        | 'Продолжительность большого перерыва, мин:'
        | 'Количество помидоров до большого перерыва:';
    value: number;
    minValue: number;
    maxValue: number;
    onChange: (value: number) => void;
}

const SettingControl = ({ label, value, minValue, maxValue, onChange }: ISettingControlProps) => (
    <li className={styles.item}>
        <p className={styles.itemDescr}>{label}</p>
        <div className={styles.itemBtnBox}>
            <button className={styles.itemBtnBoxBtnDown} onClick={() => value > minValue && onChange(value - 1)}>
                <DownSvg />
            </button>
            <p className={styles.itemValue}>{value}</p>
            <button className={styles.itemBtnBoxBtnUp} onClick={() => value < maxValue && onChange(value + 1)}>
                <UpSvg />
            </button>
        </div>
    </li>
);

export default SettingControl;
