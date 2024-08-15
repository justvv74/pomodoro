import { NextApiResponse } from 'next';
import { deleteTimer } from '@services/backend/timerService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            const pomidorId = Number(req.query.id);
            await deleteTimer(pomidorId);
            res.status(200).json({ message: 'delete' });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default auth(handler);
