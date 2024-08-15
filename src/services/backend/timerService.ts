// services/timerService.ts
import db from '@lib/db';
import { Pomidoro } from '@redux/services/pomidoro';

export const createTimer = async (userId: number, body: Pomidoro) => {
    return await db('pom_timers')
        .insert({
            user_id: userId,
            descr: body.descr,
            pomidors: body.pomidors,
            current_pomidor_timer: body.current_pomidor_timer,
            current_pomidor: body.current_pomidor,
            current_break_timer: body.current_break_timer,
            current_break: body.current_break,
            current_timer: body.current_timer,
            timer_complete: body.timer_complete,
        })
        .returning('id');
};

export const getTimerList = async (userId: number) => {
    return await db('pom_timers').select().where({ user_id: userId });
};

export const setPomidorUp = async (timerId: number) => {
    return await db('pom_timers')
        .where({ id: timerId })
        .update({
            pomidors: db.raw('pomidors + 1'),
        });
};

export const setPomidorDown = async (timerId: number) => {
    return await db('pom_timers')
        .where({ id: timerId })
        .update({
            pomidors: db.raw('pomidors - 1'),
        });
};

export const setTimerDescr = async (timerId: number, descr: string) => {
    return await db('pom_timers').where({ id: timerId }).update({
        descr: descr,
    });
};

export const updateTimerData = async (timerId: number, body: Pomidoro) => {
    return await db('pom_timers').where({ id: timerId }).update({
        descr: body.descr,
        pomidors: body.pomidors,
        current_pomidor_timer: body.current_pomidor_timer,
        current_pomidor: body.current_pomidor,
        current_break_timer: body.current_break_timer,
        current_break: body.current_break,
        current_timer: body.current_timer,
        timer_complete: body.timer_complete,
    });
};

export const deleteTimer = async (timerId: number) => {
    return await db('pom_timers').where({ id: timerId }).delete();
};
