// import axios from 'axios';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { pomidorIdAction } from '../../../state/pomidorId/action';
// import { getPomidoroListAsync } from '../../../state/PomodoroList/action';

import { IItem } from '../PomidoroList';
import styles from './PomidoroItem.module.scss';
import ItemMenu from './ItemMenu/ItemMenu';
import { setPomidorId } from '../../../../redux/services/pomidoroId';
import { fetchPomidoroList } from '../../../../redux/services/pomidoro';
import { AppDispatch } from '@redux/store';

interface IPomidoroItem {
    item: {
        id: number;
        pomidors: number;
        descr: string;
        timer_complete: boolean;
    };
    list: IItem[];
}

const PomidoroItem = ({ item, list }: IPomidoroItem) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditInputOpen, setIsEditInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState(item.descr);
    const dispatch = useDispatch<AppDispatch>();
    const ref = useRef<HTMLButtonElement>(null);

    const rect = ref.current?.getBoundingClientRect();

    function handleClick() {
        dispatch(setPomidorId(item.id));
        dispatch(fetchPomidoroList());
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    async function handleClickInput() {
        dispatch(setPomidorId(item.id));
        const body = {
            descr: inputValue,
        };

        fetch(
            `api/timers/${item.id}/descr`,

            { method: 'PATCH', body: JSON.stringify(body), credentials: 'include' }
        )
            .then((res) => {
                console.log(res);
                dispatch(fetchPomidoroList());
                setIsEditInputOpen(false);
            })
            .catch((err) => console.log(err));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <li key={item.id} className={styles.pomidoroItem}>
            <p className={styles.pomidoroItemPomidors}>{item.pomidors}</p>
            <span className={styles.pomidoroItemDescr}>{item.descr}</span>
            <div className={styles.menuBox}>
                <button className={styles.pomidoroItemMenuBtn} onClick={() => setIsMenuOpen(true)} ref={ref}>
                    <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
                        <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
                        <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
                    </svg>
                </button>
                {isMenuOpen && (
                    <ItemMenu
                        item={item}
                        onClose={() => {
                            setIsMenuOpen(false);
                        }}
                        list={list}
                        setIsEditInputOpen={setIsEditInputOpen}
                    />
                )}
            </div>
            <button className={styles.pomidoroItemBtn} onClick={handleClick}>
                1
            </button>
            {isEditInputOpen && (
                <form className={styles.pomidoroItemEditForm} onSubmit={handleSubmit}>
                    <input
                        className={styles.editFormInput}
                        type="text"
                        name="descr"
                        value={inputValue}
                        onChange={handleChange}
                        autoFocus={true}
                    />
                    <button className={styles.pomidoroItemEditFormConfirm} onClick={handleClickInput}>
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="Interface / Check">
                                <path
                                    id="Vector"
                                    d="M6 12L10.2426 16.2426L18.727 7.75732"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                        </svg>
                    </button>
                    <button className={styles.pomidoroItemEditFormСancel} onClick={() => setIsEditInputOpen(false)}>
                        <svg
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.9498 8.46447C17.3404 8.07394 17.3404 7.44078 16.9498 7.05025C16.5593 6.65973 15.9261 6.65973 15.5356 7.05025L12.0001 10.5858L8.46455 7.05025C8.07402 6.65973 7.44086 6.65973 7.05033 7.05025C6.65981 7.44078 6.65981 8.07394 7.05033 8.46447L10.5859 12L7.05033 15.5355C6.65981 15.9261 6.65981 16.5592 7.05033 16.9497C7.44086 17.3403 8.07402 17.3403 8.46455 16.9497L12.0001 13.4142L15.5356 16.9497C15.9261 17.3403 16.5593 17.3403 16.9498 16.9497C17.3404 16.5592 17.3404 15.9261 16.9498 15.5355L13.4143 12L16.9498 8.46447Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </form>
            )}
        </li>
    );
};

export default PomidoroItem;
