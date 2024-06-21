const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const TOP_SCORES_COUNT = 5;

// Get top 5 high scores
exports.fetchHighScores = async (req, res) => {
  const topScores = await prisma.highScores.findMany({
    take: TOP_SCORES_COUNT,
    orderBy: {score: 'desc'},
  });
  res.json(topScores);
};

// Get specific score in highscore list
exports.getHighScore = async (req, res) => {
  const rank = parseInt(req.params.id);
  if (isNaN(rank)) {
    res.json('Syntax Error: Not a Number')
  } else {
    try {
      const scoreEntry = await prisma.highScores.findMany({
        skip: (rank -1),
        take: 1,
        orderBy: {score: 'desc'},
      });
      if(scoreEntry.length === 1) {
        res.json(scoreEntry[0].score);
      } else {
        res.json(0);
      }
    } catch {
      res.status(409).json({error: "Unable to Fetch Score"});
    }
  }
}

// Add a highscore
exports.addHighScores = async (req, res) => {
  const { name, score } = req.body;
  const newScore = { name: name, score: score };
  try {
    const addScore = await prisma.highScores.create({ data: newScore });
    res.json(addScore);
  } catch {
    res.json({error: 'Error: Sorry there was an error adding your highscore'});
  }
}