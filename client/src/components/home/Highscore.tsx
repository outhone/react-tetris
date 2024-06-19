import { useState, useEffect } from 'react';

const Highscore = () => {
  const [highScores, setHighScores] = useState('');

  // Fetch highscore from database
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const data = await fetch('http://localhost:9000/testAPI');
        const scores = await data.text();
        setHighScores(scores);
      } catch {
        setHighScores('High Scores Unavailable');
      }
    };
    try {
      fetchHighScores();
    } catch {
      setHighScores('High Scores Unavailable');
    }
  }, []);

  const highScoreData = [
    { name: highScores, score: 10000 },
    { name: 'Coming Soon', score: 9000 },
    { name: 'Coming Soon', score: 8000 },
    { name: 'Coming Soon', score: 7000 },
    { name: 'Coming Soon', score: 6000 },
  ];

  return (
    <>
      <h1 className="text-white">HighScore</h1>
      <table>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
};

export default Highscore;
