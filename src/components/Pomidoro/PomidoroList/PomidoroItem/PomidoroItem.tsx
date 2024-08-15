// import { ChangeEvent, FormEvent, useRef, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { IItem } from '../PomidoroList';
// import styles from './PomidoroItem.module.scss';
// import ItemMenu from './ItemMenu/ItemMenu';
// import { setPomidorId } from '../../../../redux/services/pomidoroId';
// import { fetchPomidoroList } from '../../../../redux/services/pomidoro';
// import { AppDispatch } from '@redux/store';
// import ThreeDotSvg from '@images/listItem/ThreeDotSvg';
// import CheckSvg from '@images/listItem/CheckSvg';
// import CrossSvg from '@images/listItem/CrossSvg';

// interface IPomidoroItem {
//     item: {
//         id: number;
//         pomidors: number;
//         descr: string;
//         timer_complete: boolean;
//     };
//     list: IItem[];
// }

// const PomidoroItem = ({ item, list }: IPomidoroItem) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isEditInputOpen, setIsEditInputOpen] = useState(false);
//     const [inputValue, setInputValue] = useState(item.descr);
//     const dispatch = useDispatch<AppDispatch>();
//     const ref = useRef<HTMLButtonElement>(null);

//     function handleClick() {
//         dispatch(setPomidorId(item.id));
//         dispatch(fetchPomidoroList());
//     }

//     function handleChange(event: ChangeEvent<HTMLInputElement>) {
//         setInputValue(event.target.value);
//     }

//     async function handleClickInput() {
//         dispatch(setPomidorId(item.id));
//         const body = {
//             descr: inputValue,
//         };

//         fetch(
//             `api/timers/${item.id}/descr`,

//             { method: 'PATCH', body: JSON.stringify(body), credentials: 'include' }
//         )
//             .then((res) => {
//                 console.log(res);
//                 dispatch(fetchPomidoroList());
//                 setIsEditInputOpen(false);
//             })
//             .catch((err) => console.log(err));
//     }

//     function handleSubmit(event: FormEvent) {
//         event.preventDefault();
//     }

//     return (
//         <li key={item.id} className={styles.pomidoroItem}>
//             <p className={styles.pomidoroItemPomidors}>{item.pomidors}</p>
//             <span className={styles.pomidoroItemDescr}>{item.descr}</span>
//             <div className={styles.menuBox}>
//                 <button className={styles.pomidoroItemMenuBtn} onClick={() => setIsMenuOpen(true)} ref={ref}>
//                     <ThreeDotSvg />
//                 </button>
//                 {isMenuOpen && (
//                     <ItemMenu
//                         item={item}
//                         onClose={() => {
//                             setIsMenuOpen(false);
//                         }}
//                         list={list}
//                         setIsEditInputOpen={setIsEditInputOpen}
//                     />
//                 )}
//             </div>
//             <button className={styles.pomidoroItemBtn} onClick={handleClick}>
//                 1
//             </button>
//             {isEditInputOpen && (
//                 <form className={styles.pomidoroItemEditForm} onSubmit={handleSubmit}>
//                     <input
//                         className={styles.editFormInput}
//                         type="text"
//                         name="descr"
//                         value={inputValue}
//                         onChange={handleChange}
//                         autoFocus={true}
//                     />
//                     <button className={styles.pomidoroItemEditFormConfirm} onClick={handleClickInput}>
//                         <CheckSvg />
//                     </button>
//                     <button className={styles.pomidoroItemEditFormСancel} onClick={() => setIsEditInputOpen(false)}>
//                         <CrossSvg />
//                     </button>
//                 </form>
//             )}
//         </li>
//     );
// };

// export default PomidoroItem;

import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IItem } from '../PomidoroList';
import styles from './PomidoroItem.module.scss';
import ItemMenu from './ItemMenu/ItemMenu';
import { setPomidorId } from '../../../../redux/services/pomidoroId';
import { fetchPomidoroList } from '../../../../redux/services/pomidoro';
import { AppDispatch } from '@redux/store';
import ThreeDotSvg from '@images/listItem/ThreeDotSvg';
import { updatePomidorDescription } from '@services/frontend/updateTimerDescr';
import { AxiosError } from 'axios';
import { setISystemMessage } from '@redux/services/systemMessage';
import { timerdescrSchema } from 'src/utils/validationShemas';
import CheckSvg from '@images/listItem/CheckSvg';
import CrossSvg from '@images/listItem/CrossSvg';

interface IPomidoroItem {
    item: {
        id: number;
        pomidors: number;
        descr: string;
        timer_complete: boolean;
    };
    list: IItem[];
}

interface IFormInputs {
    descr: string;
}

const PomidoroItem = ({ item, list }: IPomidoroItem) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isEditInputOpen, setIsEditInputOpen] = useState<boolean>(false);
    const [isMouseOverBtn, setIsMouseOverBtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IFormInputs>({
        resolver: yupResolver(timerdescrSchema),
        defaultValues: {
            descr: item.descr,
        },
    });

    const onSubmit = async (data: IFormInputs) => {
        try {
            await updatePomidorDescription(item.id, data.descr);
            dispatch(fetchPomidoroList());
            setIsEditInputOpen(false);
            dispatch(setPomidorId(item.id));
        } catch (err) {
            const errorMessage =
                err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';

            dispatch(setISystemMessage(errorMessage));
        }
    };

    const handleClick = (e: MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        const className: string = target.className;

        if (
            typeof className === 'string' &&
            !className.includes('pomidoroItemMenuBtn') &&
            !className.includes('itemMenu') &&
            !isEditInputOpen
        ) {
            dispatch(setPomidorId(item.id));
            dispatch(fetchPomidoroList());
        }
    };

    const openEditInput = () => {
        setIsEditInputOpen(true);
        setValue('descr', item.descr);
    };

    const handleMouseOver = () => {
        setIsMouseOverBtn(true);
    };

    const handleMouseLeave = () => {
        setIsMouseOverBtn(false);
    };

    return (
        <li
            key={item.id}
            className={`${styles.pomidoroItem} ${!isEditInputOpen && !isMouseOverBtn && styles.pomidoroItemEffect}`}
            onClick={handleClick}
            tabIndex={0}
        >
            <p className={styles.pomidoroItemPomidors}>{item.pomidors}</p>
            {isEditInputOpen ? (
                <form className={styles.pomidoroItemEditForm} onSubmit={handleSubmit(onSubmit)}>
                    <input
                        className={styles.pomidoroItemEditFormInput}
                        type="text"
                        {...register('descr')}
                        autoFocus={true}
                    />
                    <button className={styles.pomidoroItemEditFormConfirm} type="submit">
                        <CheckSvg />
                    </button>
                    <button className={styles.pomidoroItemEditFormСancel} onClick={() => setIsEditInputOpen(false)}>
                        <CrossSvg />
                    </button>
                    {errors.descr && <p className={styles.error}>{errors.descr.message}</p>}
                </form>
            ) : (
                <span className={styles.pomidoroItemDescr}>{item.descr}</span>
            )}
            <div className={styles.pomidoroItemMenuBox} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <button className={styles.pomidoroItemMenuBtn} onClick={() => setIsMenuOpen(true)}>
                    <ThreeDotSvg />
                </button>
                {isMenuOpen && (
                    <ItemMenu
                        item={item}
                        onClose={() => {
                            setIsMenuOpen(false);
                        }}
                        setIsEditInputOpen={openEditInput}
                    />
                )}
            </div>
        </li>
    );
};

export default PomidoroItem;
