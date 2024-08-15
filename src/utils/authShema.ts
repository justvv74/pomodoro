import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Имя пользователя должено быть не менее 2 символов')
        .max(20, 'Имя пользователя должено быть не более 20 символов')
        .required('Имя пользователя обязательно'),
    password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .max(20, 'Пароль должен быть не более 20 символов')
        .required('Пароль обязателен'),
});
