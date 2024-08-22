// hooks/useItemMenuLogic.ts
import { useDispatch } from 'react-redux';
import { fetchPomidoroList, setManualLoading } from '@redux/services/pomidoro';
import { setISystemMessage } from '@redux/services/systemMessage';
import { increasePomidorCount, decreasePomidorCount, deletePomidor } from '@services/frontend/changeTimers';
import { AxiosError } from 'axios';
import { AppDispatch } from '@redux/store';

export const useItemMenuLogic = (
    item: {
        id: number;
        pomidors: number;
        descr: string;
        timer_complete: boolean;
    },
    onClose: () => void
) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleClickUp = async () => {
        try {
            if (item.pomidors < 48) {
                dispatch(setManualLoading(true));
                await increasePomidorCount(item.id);
                dispatch(fetchPomidoroList());
                onClose();
            }
        } catch (err) {
            const errorMessage =
                (err instanceof AxiosError &&
                    ((err.response && err.response.data.message) || err.message || 'Unknown error occurred')) ||
                'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    const handleClickDown = async () => {
        try {
            if (item.pomidors > 1) {
                dispatch(setManualLoading(true));
                await decreasePomidorCount(item.id);
                dispatch(fetchPomidoroList());
                onClose();
            }
        } catch (err) {
            const errorMessage =
                (err instanceof AxiosError &&
                    ((err.response && err.response.data.message) || err.message || 'Unknown error occurred')) ||
                'Unknown error occurred';
        }
    };

    const handleClickDelete = async () => {
        try {
            dispatch(setManualLoading(true));
            await deletePomidor(item.id);
            dispatch(fetchPomidoroList());
            onClose();
        } catch (err) {
            const errorMessage =
                (err instanceof AxiosError &&
                    ((err.response && err.response.data.message) || err.message || 'Unknown error occurred')) ||
                'Unknown error occurred';
        }
    };

    return {
        handleClickUp,
        handleClickDown,
        handleClickDelete,
    };
};
