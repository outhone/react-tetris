module.exports = app => {
  const highScores = require('./highScoresController.js');
  const router = require('express').Router();

  router.get('/', highScores.fetchHighScores);
  router.get('/:id', highScores.getHighScore);
  router.post('/', highScores.addHighScores);

  app.use('/api/highscores', router);
}