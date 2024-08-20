import { Pomidoro } from '@redux/services/pomidoro';

export const sortPomidoroList = (list: Pomidoro[], currentTimerId: number, newItem?: Pomidoro): Pomidoro[] => {
    const indexItem = list.find((item) => item.id === currentTimerId);
    if (indexItem) {
        const index = list.indexOf(indexItem);

        // Если newItem передан, заменяем объект в списке
        if (newItem) {
            list.splice(index, 1, newItem);
        }

        // Перемещаем обновленный или оригинальный объект в начало списка
        list.unshift(...list.splice(index, 1));
    }
    return list;
};
