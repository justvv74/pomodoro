import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { pomidorIdAction } from '../../../state/pomidorId/action';
// import { getPomidoroListAsync } from '../../../state/PomodoroList/action';
import styles from './ItemMenu.module.scss';
import { IItem } from '../../PomidoroList';
import { fetchPomidoroList } from '../../../../../redux/services/pomidoro';
import { setPomidorId } from '../../../../../redux/services/pomidoroId';
import UpSvg from '@images/ItemMenu/UpSvg';
import DeleteSvg from '@images/ItemMenu/DeleteSvg';
import EditSvg from '@images/ItemMenu/EditSvg';
import DownSvg from '@images/ItemMenu/DownSvg';
import useOutsideClick from 'src/hooks/useOutsideClick';
import { AppDispatch } from '@redux/store';
import axios from 'axios';

interface IItemMenu {
    item: {
        id: number;
        pomidors: number;
        descr: string;
        timer_complete: boolean;
    };
    onClose: () => void;
    list: IItem[];
    setIsEditInputOpen: (e: boolean) => void;
}

const ItemMenu = ({ item, onClose, list, setIsEditInputOpen }: IItemMenu) => {
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<HTMLUListElement>(null);

    useOutsideClick(ref, onClose);

    function handleClick() {
        const findItem = list.find((i) => i.id === item.id);
        if (findItem) {
            const index = list.indexOf(findItem);

            console.log(index);
            if (index !== 0) {
                onClose();
            }
        }
    }

    const hanleClickUp = async () => {
        console.log('hanleClickUp');
        if (item.pomidors < 48) {
            const res = await fetch(`api/timers/${item.id}/up`, {
                method: 'PATCH',
                credentials: 'include',
            })
                .then((res) => {
                    console.log(res);
                    dispatch(setPomidorId(item.id));
                    dispatch(fetchPomidoroList());
                })
                .catch((err) => console.log(err));
            handleClick();
        }
    };

    async function hanleClickDown() {
        // if (item.pomidors > 1) {
        //     axios
        //         .patch(`http://localhost:3001/pomodoro/${item.id}/down`, {
        //             withCredentials: true,
        //         })
        //         .then((res) => {
        //             console.log(res);
        //             dispatch(pomidorIdAction(item.id));
        //             dispatch(getPomidoroListAsync());
        //         })
        //         .catch((err) => console.log(err));
        //     handleClick();
        // }
    }

    function hanleClickEdit() {
        setIsEditInputOpen(true);
        onClose?.();
    }

    async function hanleClickDelete() {
        console.log('delete');
        axios
            .delete(`api/timers/${item.id}/delete`, {
                withCredentials: true,
            })
            .then((res) => {
                dispatch(fetchPomidoroList());
            })
            .catch((err) => console.log(err));
        handleClick();
    }

    return (
        <ul className={styles.itemMenuList} ref={ref}>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnUp}`}
                    onClick={hanleClickUp}
                    disabled={item.timer_complete}
                >
                    <UpSvg />
                    Увеличить
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnDown}`}
                    onClick={hanleClickDown}
                    disabled={item.timer_complete}
                >
                    <DownSvg />
                    Уменьшить
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnEdit}`}
                    onClick={hanleClickEdit}
                    disabled={item.timer_complete}
                >
                    <EditSvg />
                    Редиктировать
                </button>
            </li>
            <li className={styles.itemMenuItem}>
                <button
                    className={`${styles.itemMenuItemBtn} ${styles.itemMenuItemBtnDelete}`}
                    onClick={hanleClickDelete}
                >
                    <DeleteSvg />
                    Удалить
                </button>
            </li>
        </ul>
    );
};

export default ItemMenu;
