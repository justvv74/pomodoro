import crypto from 'crypto';
import { nanoid } from 'nanoid';
import db from '../../lib/db';

const hash = (string: string) =>
  crypto.createHash('sha256').update(string).digest('hex');

export const createUser = async (username: string, password: string) => {
  await db('pom_users').insert({ username, password: hash(password) });
};

export const findUserByUsername = async (username: string) => {
  console.log('findUserByUsername', username);
  return await db('pom_users')
    .select()
    .where({ username })
    .limit(1)
    .then((res) => res[0]);
};

export const createSession = async (userId: number) => {
  const sessionId = nanoid();

  await db('pom_sessions').insert({
    user_id: userId,
    session_id: sessionId,
  });

  return sessionId;
};

export const deleteSession = async (sessionId: string) => {
  await db('pom_sessions').where({ session_id: sessionId }).delete();
};
