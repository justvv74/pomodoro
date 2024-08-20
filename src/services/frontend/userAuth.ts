import axios, { AxiosError } from 'axios';

export const handleSignIn = async (
    username: string,
    password: string,
    setCode: (e: number) => number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsLoading(true);
    const body = {
        username: username,
        password: password,
    };

    try {
        const res = await axios.post('/api/signin', body, {
            headers: { 'Content-Type': 'application/json' },
        });

        setCode(res.status);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            setCode(err.response.status);
        } else {
            setCode(500);
        }
    } finally {
        setIsLoading(false);
    }
};

export const handleSignUp = async (
    username: string,
    password: string,
    setCode: (e: number) => number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsLoading(true);
    const body = {
        username: username,
        password: password,
    };

    try {
        const res = await axios.post('/api/signup', body, {
            headers: { 'Content-Type': 'application/json' },
        });

        setCode(res.status);

        if (res.status === 201) {
            await handleSignIn(username, password, setCode, setIsLoading);
        }
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            setCode(err.response.status);
        } else {
            setCode(500);
        }
    } finally {
        setIsLoading(false);
    }
};

export const logout = async () => {
    try {
        return await axios.get('api/logout', {
            withCredentials: true,
        });
    } catch (err) {
        const errorMessage: string =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred 1';
        throw new Error(errorMessage);
    }
};
