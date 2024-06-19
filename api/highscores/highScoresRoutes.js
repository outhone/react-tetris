module.exports = app => {
  const highScores = require('./highScoresController.js');
  const router = require('express').Router();

  router.get('/', highScores.fetchHighScores);
  router.post('/', highScores.addHighScores);

  app.use('/api/highscores', router);
}