import * as Yup from 'yup';

export const addTimerShema = Yup.object().shape({
    description: Yup.string()
        .min(2, 'Минимум 2 знака')
        .max(40, 'Максимум 40 знаков')
        .required('Название задачи обязательно'),
});

export const timerdescrSchema = Yup.object().shape({
    descr: Yup.string().required('Описание обязательно').min(3, 'Минимум 3 символа'),
});

export const authSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Имя пользователя должено быть не менее 2 символов')
        .max(20, 'Имя пользователя должено быть не более 20 символов')
        .required('Имя пользователя обязательно'),
    password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(20, 'Пароль должен быть не более 20 символов')
        .required('Пароль обязателен'),
});
