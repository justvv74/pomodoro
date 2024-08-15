import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteSession } from '@services/backend/userService';
import { AuthenticatedNextApiRequest } from '../../types/middleware';
import { auth } from '@middleware/auth';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const sessionId = req.sessionId;

            await deleteSession(sessionId);
            res.setHeader('Set-Cookie', [
                'sessionId=; Max-Age=0; path=/; HttpOnly;',
                'userAuth=; Max-Age=0; path=/; HttpOnly;',
            ]);
            res.status(200).json({ message: 'logout' });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default auth(handler);
