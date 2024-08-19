import { MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
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
    console.log('1111111111111111111', item);
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
