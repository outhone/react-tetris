exports.fetchHighScores = async (req, res) => {
  // Use Prisma to add new highscore
  // Send test data for now
  res.json([{name: 'John', score: 10000}, {name: 'James', score: 9000}, {name: 'Jack', score: 8000}]);
};

exports.addHighScores = async (req, res) => {
  // Use Prisma to add new highscore
  res.send('Post user controller');
}
