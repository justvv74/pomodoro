require('dotenv').config();

const express = require('express');
const router = express.Router();
const { auth } = require('./auth');
const f = require('./index');

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

const createTimer = async (userId, descr, pomidors) => {
  return await knex('pom_timers')
    .insert({
      user_id: userId,
      descr: descr,
      pomidors: pomidors,
    })
    .returning('id');
};

const getTimerList = async (userId) => {
  return await knex('pom_timers')
    .select()
    .where({ user_id: userId })
    .then((data) => data);
};

const setPomidorUp = async (timerId) => {
  return await knex('pom_timers')
    .where({ id: timerId })
    .update({
      pomidors: knex.raw('pomidors + 1'),
    });
};

const setPomidorDown = async (timerId) => {
  return await knex('pom_timers')
    .where({ id: timerId })
    .update({
      pomidors: knex.raw('pomidors - 1'),
    });
};

const setTimerDescr = async (timerId, descr) => {
  return await knex('pom_timers').where({ id: timerId }).update({
    descr: descr,
  });
};

const deleteTimer = async (timerId) => {
  return await knex('pom_timers').where({ id: timerId }).delete();
};

router.post('/add', auth(), async (req, res) => {
  try {
    const user = req.user.username;
    const { descr, pomidors } = req.body;
    const { id } = await f.findUserByUsername(user);
    const pomidorId = await createTimer(id, descr, pomidors);

    res.status(201).send({ pomidorId: pomidorId[0].id });
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/list', auth(), async (req, res) => {
  try {
    const { id } = req.user;
    const list = await getTimerList(id);
    res.status(200).header('Access-Control-Allow-Origin', 'http://localhost:3000').json(list);
    console.log('list', 200);
  } catch (err) {
    console.log('list', err);
    res.status(401).send(err.message);
  }
});

router.patch('/:id/up', auth(), (req, res) => {
  try {
    const pomidorId = req.path.replace(/\D/g, '');
    setPomidorUp(pomidorId);
    res.status(200).send('up');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch('/:id/down', auth(), (req, res) => {
  try {
    const pomidorId = req.path.replace(/\D/g, '');
    setPomidorDown(pomidorId);
    res.status(200).send('down');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch('/:id/descr', auth(), (req, res) => {
  try {
    const descr = req.body.descr;
    const pomidorId = req.path.replace(/\D/g, '');
    setTimerDescr(pomidorId, descr);
    res.status(200).send('Edit');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/:id/delete', auth(), (req, res) => {
  try {
    const pomidorId = req.path.replace(/\D/g, '');
    deleteTimer(pomidorId);
    res.status(200).send('delete');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
