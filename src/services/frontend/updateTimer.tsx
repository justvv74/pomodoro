import { Pomidoro } from '@redux/services/pomidoro';
import axios, { AxiosError } from 'axios';

export const updatePomidor = async (id: number, body: Partial<Pomidoro>) => {
    try {
        const response = await axios.patch(`/api/timers/${id}/update`, { ...body }, { withCredentials: true });

        return response.data;
    } catch (err) {
        const errorMessage: string =
            err instanceof AxiosError && err?.response?.data.message
                ? err.response.data.message
                : 'Unknown error occurred';
        throw new Error(errorMessage);
    }
};
