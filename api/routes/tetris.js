var express = require("express");
var router = express.Router();

router.get('/', function (req, res) {
  // Use Prisma to retrieve highscores
  res.json([{name: 'Test', score: 10000}]);
});

router.post('/', function (req, res) {
  // Use Prisma to add new highscore
  res.send('Post user controller');
});

module.exports = router;
