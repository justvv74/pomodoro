require('dotenv').config();

const express = require('express');
const router = express.Router();
const { auth } = require('./auth');
// const f = require('./index');

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

const createSettings = async (userId, data) => {
  return knex('pom_settings')
    .insert({
      user_id: userId,
      timer_duration: data.timer_duration,
      break_duration: data.break_duration,
      big_break_duration: data.big_break_duration,
      before_big_break: data.before_big_break,
    })
    .returning('id');
};

const findSettingsbyUserId = async (userId) => {
  return knex('pom_settings')
    .where({ user_id: userId })
    .limit(1)
    .then((res) => res[0]);
};

const updateSettings = async (userId, data) => {
  return knex('pom_settings').where({ user_id: userId }).update(data);
};

router.post('/', auth(), async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const settings = await findSettingsbyUserId(userId);
    if (settings !== undefined) {
      res.sendStatus(304);
    } else {
      createSettings(userId, data);
      res.status(200).send('ok');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/', auth(), async (req, res) => {
  console.log('settings/get');
  try {
    const userId = req.user.id;
    const settings = await findSettingsbyUserId(userId);
    if (settings !== undefined) {
      res.status(200).json(settings);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch('/', auth(), async (req, res) => {
  console.log('settings/patch');
  try {
    const userId = req.user.id;
    const data = req.body;
    const newSettings = await updateSettings(userId, data);
    if (newSettings === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).send('Settings updated successfully');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
