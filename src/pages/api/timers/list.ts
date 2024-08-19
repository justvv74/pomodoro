import { NextApiResponse } from 'next';
import { getTimerList } from '@services/backend/timerService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const user = req.user;
            const list = await getTimerList(user.id);

            res.status(200).json(list);
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
