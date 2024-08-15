import { NextApiResponse } from 'next';
import { createTimer } from '@services/backend/timerService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const user = req.user;
            const pomidorId = await createTimer(user.id, req.body);
            console.log('/add', user.id, pomidorId);
            res.status(201).json({ pomidorId: pomidorId[0].id });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default auth(handler);
