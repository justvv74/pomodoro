import React from 'react';
import styles from './TextBlock.module.scss';

const TextBlock = () => {
    return (
        <div className={styles.textbox}>
            <h3 className={styles.textboxTitle}>Ура! Теперь можно начать работать:</h3>
            <ul className={styles.textboxList}>
                <li className={styles.textboxItem}>Добавьте задачу, указав её название</li>
                <li className={styles.textboxItem}>Управляейте количеством помидоров из меню в каждом задаче</li>
                <li className={styles.textboxItem}> Запустите таймер «помидор»</li>
                <li className={styles.textboxItem}> Работайте пока «помидор» не закончится</li>
                <li className={styles.textboxItem}> Сделайте короткий перерыв (2-7 минут)</li>
                <li className={styles.textboxItem}>
                    Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые
                    2-10 «помидоров» делайте длинный перерыв (10-30 минут).
                </li>
                <li className={styles.textboxItem}> Настройки помидоров можно менять в меню пользователя</li>
            </ul>
        </div>
    );
};

export default TextBlock;
