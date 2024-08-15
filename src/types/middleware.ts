import { NextApiRequest } from 'next';
import { userType } from './userTypes';

export interface AuthenticatedNextApiRequest extends NextApiRequest {
    user: userType;
    sessionId: string;
}
