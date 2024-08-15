import { NextApiResponse } from 'next';
import { updateTimerData } from '@services/backend/timerService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../../../types/middleware';

const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    if (req.method === 'PATCH') {
        try {
            const pomidorId = Number(req.query.id);
            await updateTimerData(pomidorId, req.body);
            res.status(200).json({ message: 'Update' });
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
