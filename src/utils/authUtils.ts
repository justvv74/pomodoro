export const handleResponseMessage = (code: number, setResError: React.Dispatch<React.SetStateAction<string>>) => {
    switch (code) {
        case 400:
            setResError('Неизвестная ошибка сервера, попробуйте позже');
            break;
        case 409:
            setResError('Пользователь уже зарегистрирован, выполните вход');
            break;
        case 401:
            setResError('Неправильный логин или пароль!');
            break;
        case 500:
            setResError('Неизвестная ошибка сервера, попробуйте позже');
            break;
        default:
            break;
    }
};
