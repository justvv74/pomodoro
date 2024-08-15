import axios, { AxiosError } from 'axios';

export const updatePomidorDescription = async (id: number, descr: string) => {
    try {
        const response = await axios.patch(`/api/timers/${id}/descr`, { descr }, { withCredentials: true });
        return response.data;
    } catch (err) {
        const errorMessage =
            err instanceof AxiosError && err.response ? err.response.data.message : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};
