import React, { useEffect } from 'react';
import styles from './TextBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchPomidoroList } from '../../../redux/services/pomidoro';

const TextBlock = () => {
    return (
        <div className={styles.textbox}>
            <h3 className={styles.title}>Ура! Теперь можно начать работать:</h3>
            <ul className={styles.list}>
                <li className={styles.item}>Выберите категорию и напишите название текущей задачи</li>
                <li className={styles.item}> Запустите таймер («помидор»)</li>
                <li className={styles.item}> Работайте пока «помидор» не прозвонит</li>
                <li className={styles.item}> Сделайте короткий перерыв (3-5 минут)</li>
                <li className={styles.item}>
                    Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора»
                    делайте длинный перерыв (15-30 минут).
                </li>
            </ul>
        </div>
    );
};

export default TextBlock;
