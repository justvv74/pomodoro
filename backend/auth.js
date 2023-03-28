const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: { min: 0, max: 1 },
});

const findUserBySessionId = async (sessionId) => {
  const session = await knex('pom_sessions')
    .select('user_id')
    .where({ session_id: sessionId })
    .limit(1)
    .then((res) => res[0]);

  if (!session) {
    return;
  }

  return knex('pom_users')
    .select()
    .where({ id: session.user_id })
    .limit(1)
    .then((res) => res[0]);
};

const auth = () => async (req, res, next) => {
  if (!req.cookies['sessionId']) {
    return next();
  }
  const user = await findUserBySessionId(req.cookies['sessionId']);
  req.user = user;
  req.sessionId = req.cookies['sessionId'];
  next();
};

exports.auth = auth;
