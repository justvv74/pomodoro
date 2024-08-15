import React from 'react';
import styles from './TextBlock.module.scss';

const TextBlock = () => {
    return (
        <div className={styles.textbox}>
            <h3 className={styles.textboxTitle}>Ура! Теперь можно начать работать:</h3>
            <ul className={styles.textboxList}>
                <li className={styles.textboxItem}>Выберите категорию и напишите название текущей задачи</li>
                <li className={styles.textboxItem}> Запустите таймер («помидор»)</li>
                <li className={styles.textboxItem}> Работайте пока «помидор» не прозвонит</li>
                <li className={styles.textboxItem}> Сделайте короткий перерыв (3-5 минут)</li>
                <li className={styles.textboxItem}>
                    Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора»
                    делайте длинный перерыв (15-30 минут).
                </li>
            </ul>
        </div>
    );
};

export default TextBlock;
