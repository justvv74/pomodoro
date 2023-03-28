require('dotenv').config();

const express = require('express');
const { nanoid } = require('nanoid');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { auth } = require('./auth');

const app = express();
const hash = (string) => crypto.createHash('sha256').update(string).digest('hex');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  pool: { min: 0, max: 2 },
});

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/pomodoro', require('./pomodoro'));
app.use('/settings', require('./settings'));

const createUser = async (username, password) =>
  await knex('pom_users').insert({ username: username, password: hash(password) });

const findUserByUsername = async (username) => {
  console.log('findUserByUsername');
  return await knex('pom_users')
    .select()
    .where({ username })
    .limit(1)
    .then((res) => res[0]);
};

const createSession = async (userId) => {
  const sessionId = nanoid();

  await knex('pom_sessions').insert({
    user_id: userId,
    session_id: sessionId,
  });

  return sessionId;
};

const deleteSession = async (sessionId) => {
  await knex('pom_sessions').where({ session_id: sessionId }).delete();
};

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/signup', bodyParser.urlencoded({ extended: false }), async (req, res) => {
  console.log('signup');
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (user !== undefined) {
      return res.status(304).send('User already registered');
    } else {
      createUser(username, password);
      res.status(201).send('User successfully registered');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post('/login', bodyParser.urlencoded({ extended: false }), async (req, res) => {
  console.log('login');
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);
    if (!user || user.password !== hash(password)) {
      console.log('error');
      return res.sendStatus(401);
    } else {
      console.log('success');
      const sessionId = await createSession(user.id);
      res.status(200).cookie('sessionId', sessionId, { httpOnly: true }).send(user.username);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/logout', auth(), async (req, res) => {
  console.log('/logout', req.user, req.cookies);
  try {
    if (!req.user) {
      return req.sendStatus(401);
    }

    await deleteSession(req.sessionId);
    res.clearCookie('sessionId').send('logout');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/user', auth(), (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).send(user.username);
    } else {
      res.status(401);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
  next();
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});

exports.findUserByUsername = findUserByUsername;
