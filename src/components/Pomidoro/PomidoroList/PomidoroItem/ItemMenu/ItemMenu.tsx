import { useRef } from 'react';
import styles from './ItemMenu.module.scss';
import useOutsideClick from '@hooks/useOutsideClick';
import UpSvg from '@images/ItemMenu/UpSvg';
import DownSvg from '@images/ItemMenu/DownSvg';
import EditSvg from '@images/ItemMenu/EditSvg';
import DeleteSvg from '@images/ItemMenu/DeleteSvg';
import { useItemMenuLogic } from '@hooks/useItemMenuLogic';
import { Pomidoro } from '@redux/services/pomidoro';

interface IItemMenu {
    item: Pomidoro;
    onClose: () => void;
    setIsEditInputOpen: (e: boolean) => void;
}

const ItemMenu = ({ item, onClose, setIsEditInputOpen }: IItemMenu) => {
    const ref = useRef<HTMLUListElement>(null);
    const { handleClickUp, handleClickDown, handleClickDelete } = useItemMenuLogic(item, onClose);

    useOutsideClick(ref, onClose);

    const handleClickEdit = () => {
        setIsEditInputOpen(true);
        onClose();
    };

    return (
        <ul className={styles.itemMenuList} ref={ref}>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnUp}`}
                    onClick={handleClickUp}
                    disabled={item.timer_complete || item.pomidors >= 48}
                >
                    <UpSvg />
                    Увеличить
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnDown}`}
                    onClick={handleClickDown}
                    disabled={item.timer_complete || item.pomidors <= 1 || item.pomidors === item.current_pomidor}
                >
                    <DownSvg />
                    Уменьшить
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnEdit}`}
                    onClick={handleClickEdit}
                    disabled={item.timer_complete}
                >
                    <EditSvg />
                    Редактировать
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnDelete}`}
                    onClick={handleClickDelete}
                >
                    <DeleteSvg />
                    Удалить
                </button>
            </li>
        </ul>
    );
};

export default ItemMenu;
