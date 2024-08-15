import type { NextApiResponse } from 'next';
import { findUserByUsername, createSession } from '@services/backend/userService';
import cookie from 'cookie';
import { AuthenticatedNextApiRequest } from '../../types/middleware';
const crypto = require('crypto');

const hash = (string: string) => crypto.createHash('sha256').update(string).digest('hex');

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;
            const user = await findUserByUsername(username);

            if (!user || user.password !== hash(password)) {
                res.status(401).json({ message: `User not found` });
                return;
            } else {
                const sessionId = await createSession(user.id);

                const sessionCookie = cookie.serialize('sessionId', sessionId, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });

                const userCookie = cookie.serialize('userAuth', user.username, {
                    httpOnly: false,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/',
                });

                res.status(200).setHeader('Set-Cookie', [sessionCookie, userCookie]).json({ user: user.username });
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default handler;
