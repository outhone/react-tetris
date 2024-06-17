const Highscore = () => {
  // Fetch highscore from database
  const highScoreData = [
    { name: 'John', score: 1000 },
    { name: 'James', score: 2000 },
    { name: 'Jake', score: 3000 },
    { name: 'Jim', score: 4000 },
  ];

  return (
    <>
      <h1 className="text-white">HighScore</h1>
      <table>
        <tr className="tbl-header">
          <th>Player</th>
          <th>Score</th>
        </tr>
        {highScoreData.map((playerScore) => (
          <tr key={`${playerScore.name}-${playerScore.score}`}>
            <td>{playerScore.name}</td>
            <td>{playerScore.score}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Highscore;
