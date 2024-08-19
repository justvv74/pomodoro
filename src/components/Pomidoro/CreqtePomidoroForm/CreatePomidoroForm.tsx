import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CreatePomidoroForm.module.scss';
import { AppDispatch, RootState } from '@redux/store';
import { setPomidorId } from '@redux/services/pomidoroId';
import { fetchPomidoroList, setManualLoading } from '@redux/services/pomidoro';
import { createPomidor } from '@services/frontend/addTimer';
import { AxiosError } from 'axios';
import { setISystemMessage } from '@redux/services/systemMessage';
import { addTimerShema } from 'src/utils/validationShemas';
// import Error from 'next/error';

const CreatePomidorForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { settingsData } = useSelector((state: RootState) => state.userSettings);
    const { loading } = useSelector((state: RootState) => state.pomidoro);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addTimerShema),
    });

    const onSubmit = async (data: { description: string }) => {
        dispatch(setManualLoading(true));
        try {
            await createPomidor(data.description, settingsData.timer_duration, settingsData.break_duration);
            dispatch(setPomidorId(0));
            dispatch(fetchPomidoroList());
            reset();
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';

            dispatch(setISystemMessage(errorMessage));
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInputBox}>
                <input
                    className={styles.formInput}
                    type="text"
                    {...register('description')}
                    placeholder="Название задачи"
                    maxLength={40}
                />
                {errors.description && <p className={styles.formInputBoxError}>{errors.description.message}</p>}
            </div>
            <button className={styles.formBtn} type="submit">
                Добавить
            </button>
            {loading && <div className="spinner"></div>}
        </form>
    );
};

export default CreatePomidorForm;
