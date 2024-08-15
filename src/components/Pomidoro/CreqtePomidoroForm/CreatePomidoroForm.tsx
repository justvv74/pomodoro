// import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getPomidoroListAsync } from '../../state/PomodoroList/action';
// import { RootState } from '../../state/store';
// import { IUserSettingsData } from '../../state/userSettings/action';
import styles from './CreatePomidoroForm.module.scss';
import axios from 'axios';
import { AppDispatch, RootState } from '@redux/store';
import { setPomidorId } from '@redux/services/pomidoroId';
import { fetchPomidoroList } from '@redux/services/pomidoro';
// import { pomidorIdAc/tion } from '../../state/pomidorId/action';

const CreatePomidorForm = () => {
    const { data, loading, error } = useSelector((state: RootState) => state.pomidoro);
    const [value, setValue] = useState('');

    const { settingsData, settingsLoading, settingsError } = useSelector((state: RootState) => state.userSettings);
    const dispatch = useDispatch<AppDispatch>();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios
            .post(
                'api/timers/add',
                {
                    descr: value,
                    pomidors: 1,
                    current_pomidor_timer: settingsData.timer_duration * 60,
                    current_pomidor: 1,
                    current_break_timer: settingsData.break_duration * 60,
                    current_break: 0,
                    current_timer: 'pomidor',
                    timer_complete: false,
                },
                { withCredentials: true }
            )
            .then((res) => {
                dispatch(setPomidorId(0));
                dispatch(fetchPomidoroList());
            })
            .catch((err) => {
                console.log(String(err));
            });
        setValue('');
    };

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.formInput}
                    type="text"
                    name="pomidor"
                    value={value}
                    onChange={handleChange}
                    placeholder="Название задачи"
                />
                <button className={styles.formBtn}>Добавить</button>
                {loading && <div className="spinner"></div>}
            </form>
        </>
    );
};

export default CreatePomidorForm;
