import axios, { AxiosError } from 'axios';

export const increasePomidorCount = async (id: number) => {
    try {
        await axios.patch(`api/timers/${id}/up`, {
            withCredentials: true,
        });
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};

export const decreasePomidorCount = async (id: number) => {
    try {
        await axios.patch(`api/timers/${id}/down`, {
            withCredentials: true,
        });
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};

export const deletePomidor = async (id: number) => {
    try {
        await axios.delete(`api/timers/${id}/delete`, {
            withCredentials: true,
        });
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};
