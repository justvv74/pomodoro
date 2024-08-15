import type { NextApiResponse } from 'next';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    try {
        const user = req.user;

        res.status(200).json({ username: user.username });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(400).json({ message: errorMessage });
    }
};

export default auth(handler);
