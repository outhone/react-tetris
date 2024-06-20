const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.fetchHighScores = async (req, res) => {
  const topFive = await prisma.highScores.findMany({
    take: 5,
    orderBy: {score: 'desc'},
  });
  res.json(topFive);
};

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
