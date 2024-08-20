import axios, { AxiosError } from 'axios';

export const updatePomidorDescription = async (id: number, descr: string) => {
    try {
        const response = await axios.patch(`/api/timers/${id}/descr`, { descr }, { withCredentials: true });
        return response.data;
    } catch (err) {
        const errorMessage: string =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};
