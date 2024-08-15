import { NextApiResponse } from 'next';
import { setTimerDescr } from '@services/backend/timerService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        try {
            const pomidorId = Number(req.query.id);
            const descr = req.body.descr;
            await setTimerDescr(pomidorId, descr);
            res.status(200).json({ message: 'Edit' });
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            res.status(400).json({ message: errorMessage });
        }
    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default auth(handler);
