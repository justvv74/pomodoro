// pages/api/settings.ts
import { NextApiResponse } from 'next';
import { createSettings, findSettingsByUserId, updateSettings } from '@services/backend/settingsService';
import { auth } from '@middleware/auth';
import { AuthenticatedNextApiRequest } from '../../types/middleware';

const handlePost = async (req: AuthenticatedNextApiRequest, res: NextApiResponse, userId: number) => {
    try {
        const data = req.body;
        const settings = await findSettingsByUserId(userId);
        if (settings) {
            res.status(304).end('User already has settings');
        } else {
            await createSettings(userId, data);

            res.status(201).json(data);
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(400).json({ message: errorMessage });
    }
};

const handleGet = async (req: AuthenticatedNextApiRequest, res: NextApiResponse, userId: number) => {
    try {
        const settings = await findSettingsByUserId(userId);
        if (settings) {
            res.status(200).json(settings);
        } else {
            res.status(404).json({ message: 'Settings not found' });
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(400).json({ message: errorMessage });
    }
};

const handlePatch = async (req: AuthenticatedNextApiRequest, res: NextApiResponse, userId: number) => {
    try {
        const data = req.body;
        const updated = await updateSettings(userId, data);
        if (updated === 0) {
            res.status(404).json({ message: 'Settings not found' });
        } else {
            res.status(200).json(data);
        }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        res.status(400).json({ message: errorMessage });
    }
};

// Обработка POST-запроса
const handler = async (req: AuthenticatedNextApiRequest, res: NextApiResponse): Promise<void> => {
    const method = req.method;
    const user = req.user;

    switch (method) {
        case 'POST':
            return handlePost(req, res, user.id);
        case 'GET':
            return handleGet(req, res, user.id);
        case 'PATCH':
            return handlePatch(req, res, user.id);
        default:
            res.setHeader('Allow', ['POST', 'GET', 'PATCH']);
            res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
};

export default auth(handler);
