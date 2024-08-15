import db from '@lib/db';

interface SettingsData {
    timer_duration: number;
    break_duration: number;
    big_break_duration: number;
    before_big_break: number;
    auto_start: boolean;
    alerts: boolean;
    theme: string;
}

export const createSettings = async (userId: number, data: SettingsData) => {
    return db('pom_settings')
        .insert({
            user_id: userId,
            ...data,
        })
        .returning('id');
};

export const findSettingsByUserId = async (userId: number) => {
    return db('pom_settings')
        .where({ user_id: userId })
        .limit(1)
        .then((res) => res[0]);
};

export const updateSettings = async (userId: number, data: Partial<SettingsData>) => {
    return db('pom_settings').where({ user_id: userId }).update(data);
};
