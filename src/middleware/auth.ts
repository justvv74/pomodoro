import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import db from '@lib/db';
import { AuthenticatedNextApiRequest } from '../types/middleware';

export const findUserBySessionId = async (sessionId: string) => {
    const session = await db('pom_sessions')
        .select('user_id')
        .where({ session_id: sessionId })
        .limit(1)
        .then((res) => res[0]);

    if (!session) {
        return null;
    }

    return db('pom_users')
        .select()
        .where({ id: session.user_id })
        .limit(1)
        .then((res) => res[0]);
};

// Мидлвар auth
export const auth = (handler: (req: AuthenticatedNextApiRequest, res: NextApiResponse) => Promise<void>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const sessionId = req.cookies['sessionId'];

        if (!sessionId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await findUserBySessionId(sessionId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Добавляем пользователя к запросу
        (req as AuthenticatedNextApiRequest).user = user;
        (req as AuthenticatedNextApiRequest).sessionId = sessionId;

        return handler(req as AuthenticatedNextApiRequest, res);
    };
};
