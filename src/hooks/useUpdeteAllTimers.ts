import { setISystemMessage } from '@redux/services/systemMessage';
import { AppDispatch, RootState } from '@redux/store';
import { updatePomidor } from '@services/frontend/updateTimer';
import { useDispatch, useSelector } from 'react-redux';
import { SECONDS_IN_MINUTE } from 'src/utils/systemData';

export const useUpdeteAllTimers = () => {
    const data = useSelector((state: RootState) => state.pomidoro.data);
    const { settingsData } = useSelector((state: RootState) => state.userSettings);
    const oldSettings = useSelector((state: RootState) => state.oldSettings.settingsData);
    const dispatch = useDispatch<AppDispatch>();

    const updateList = async () => {
        try {
            await Promise.all(
                data.map((item) => {
                    const body = {
                        ...item,
                        current_pomidor_timer:
                            item.current_pomidor_timer !== oldSettings.timer_duration * SECONDS_IN_MINUTE
                                ? item.current_pomidor_timer
                                : settingsData.timer_duration,
                        current_break_timer:
                            item.current_break_timer !== oldSettings.break_duration * SECONDS_IN_MINUTE
                                ? item.current_break_timer
                                : settingsData.break_duration,
                    };
                    updatePomidor(item.id, body);
                })
            );
        } catch (err) {
            const errorMessage = err instanceof Error && err.message ? err.message : 'Unknown error occurred';
            dispatch(setISystemMessage(errorMessage));
        }
    };

    return { updateList };
};
