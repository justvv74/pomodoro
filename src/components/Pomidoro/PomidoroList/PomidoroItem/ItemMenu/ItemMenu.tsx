import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './ItemMenu.module.scss';
import useOutsideClick from '@hooks/useOutsideClick';
import { fetchPomidoroList } from '@redux/services/pomidoro';
import { AppDispatch } from '@redux/store';
import UpSvg from '@images/ItemMenu/UpSvg';
import DownSvg from '@images/ItemMenu/DownSvg';
import EditSvg from '@images/ItemMenu/EditSvg';
import DeleteSvg from '@images/ItemMenu/DeleteSvg';
import { decreasePomidorCount, deletePomidor, increasePomidorCount } from '@services/frontend/changeTimers';
import { setISystemMessage } from '@redux/services/systemMessage';
import { AxiosError } from 'axios';
import { useItemMenuLogic } from '@hooks/useItemMenuLogic';

interface IItemMenu {
    item: {
        id: number;
        pomidors: number;
        descr: string;
        timer_complete: boolean;
    };
    onClose: () => void;
    setIsEditInputOpen: (e: boolean) => void;
}

const ItemMenu = ({ item, onClose, setIsEditInputOpen }: IItemMenu) => {
    const ref = useRef<HTMLUListElement>(null);
    const { handleClickUp, handleClickDown, handleClickDelete } = useItemMenuLogic(item, onClose);

    useOutsideClick(ref, onClose);

    // const handleClickUp = async () => {
    //     try {
    //         if (item.pomidors < 48) {
    //             await increasePomidorCount(item.id);
    //             dispatch(fetchPomidoroList());
    //             onClose();
    //         }
    //     } catch (err) {
    //         const errorMessage =
    //             err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';
    //         dispatch(setISystemMessage(errorMessage.message));
    //     }
    // };

    // const handleClickDown = async () => {
    //     try {
    //         if (item.pomidors > 1) {
    //             await decreasePomidorCount(item.id);
    //             dispatch(fetchPomidoroList());
    //             onClose();
    //         }
    //     } catch (err) {
    //         const errorMessage =
    //             err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';
    //         dispatch(setISystemMessage(errorMessage.message));
    //     }
    // };

    const handleClickEdit = () => {
        setIsEditInputOpen(true);
        onClose();
    };

    // const handleClickDelete = async () => {
    //     try {
    //         await deletePomidor(item.id);
    //         dispatch(fetchPomidoroList());
    //         onClose();
    //     } catch (err) {
    //         const errorMessage =
    //             err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';
    //         dispatch(setISystemMessage(errorMessage.message));
    //     }
    // };

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
                    disabled={item.timer_complete || item.pomidors <= 1}
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
