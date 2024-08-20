import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './PomidoroItem.module.scss';
import ItemMenu from './ItemMenu/ItemMenu';
import { fetchPomidoroList, Pomidoro } from '../../../../redux/services/pomidoro';
import ThreeDotSvg from '@images/listItem/ThreeDotSvg';
import { updatePomidorDescription } from '@services/frontend/updateTimerDescr';
import { timerdescrSchema } from 'src/utils/validationShemas';
import CheckSvg from '@images/listItem/CheckSvg';
import CrossSvg from '@images/listItem/CrossSvg';
import { AppDispatch, RootState } from '@redux/store';
import { setISystemMessage } from '@redux/services/systemMessage';
import { fetchTimerById, setCurrentTimer } from '@redux/services/currentTimer';
import { setPomidoroList } from '@redux/services/pomidoro';
import { sortPomidoroList } from 'src/utils/sortPomidoroList';

interface IPomidoroItem {
    item: Pomidoro;
    list: Pomidoro[];
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
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';

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
            dispatch(fetchTimerById(item.id));
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
            <p
                className={`${styles.pomidoroItemPomidors} ${
                    item.timer_complete && styles.pomidoroItemPomidorsIsComplete
                }`}
            >
                {item.pomidors}
            </p>
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
