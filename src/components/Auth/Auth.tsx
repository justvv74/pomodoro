'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './Auth.module.scss';
import { handleSignIn, handleSignUp } from '@services/frontend/userAuth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@images/loginLogo.png';
import { authSchema } from 'src/utils/validationShemas';

interface IFormInput {
    username: string;
    password: string;
}

const Auth = () => {
    const [reqAddr, setReqAddr] = useState<'signIn' | 'signUp'>('signIn');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resError, setResError] = useState<string>('');
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IFormInput>({
        resolver: yupResolver(authSchema),
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        let code: number = 0;

        if (reqAddr === 'signIn') {
            await handleSignIn(data.username, data.password, (c) => (code = c), setIsLoading);
        } else {
            await handleSignUp(data.username, data.password, (c) => (code = c), setIsLoading);
        }

        if (code === 200) {
            router.push('/');
        } else {
            handleResponseMessage(code);
        }
    };

    const handleResponseMessage = (code: number) => {
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

    return (
        <main className={styles.loginBox}>
            <Image className={styles.loginBoxLogo} src={logo} alt="Logo" />
            <div className={styles.loginBoxFormBox}>
                <p className={styles.loginBoxFormBoxTitle}>Совсем чуть-чуть и можем начинать!</p>
                <form className={styles.loginBoxForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.loginBoxInputBox}>
                        <input
                            className={styles.loginBoxInput}
                            type="text"
                            placeholder="Ваше имя"
                            {...register('username')}
                        />
                        {errors.username && <p className={styles.loginBoxInputBoxError}>{errors.username.message}</p>}
                    </div>
                    <div className={styles.loginBoxInputBox}>
                        <input
                            className={styles.loginBoxInput}
                            type="password"
                            placeholder="Пароль"
                            {...register('password')}
                        />
                        {errors.password && <p className={styles.loginBoxInputBoxError}>{errors.password.message}</p>}
                    </div>
                    {resError && <p className={styles.loginBoxMessege}>{resError}</p>}
                    {isLoading && <div className={styles.loginBoxSpinner}></div>}
                    <button className={styles.loginBoxBtn} type="submit" onClick={() => setReqAddr('signIn')}>
                        Войти
                    </button>
                    <span className={styles.loginBoxAddSignup}>или, если нет аккаунта</span>
                    <button className={styles.loginBoxBtn} type="submit" onClick={() => setReqAddr('signUp')}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Auth;
