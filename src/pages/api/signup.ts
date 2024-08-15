import type { NextApiResponse } from 'next';
import { createUser, findUserByUsername } from '@services/backend/userService';
import { AuthenticatedNextApiRequest } from '../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { username, password } = req.body;
            const user = await findUserByUsername(username);
            if (user !== undefined) {
                res.status(409).json({ message: `User already exist` });
                return;
            } else {
                await createUser(username, password);
                res.status(201).json({ message: 'User successfully registered' });
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
