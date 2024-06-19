import { useState, useEffect } from 'react';

type ScoreType = {
  name: string;
  score: number;
};

type ScoresType = {
  scores: ScoreType[];
};

const Score = ({ scores }: ScoresType) => (
  <>
    {scores.map((playerScore: ScoreType) => (
      <tr key={`${playerScore.name}-${playerScore.score}`}>
        <td>{playerScore.name}</td>
        <td>{playerScore.score}</td>
      </tr>
    ))}
  </>
);

const Highscore = () => {
  const [highScores, setHighScores] = useState<ScoreType[] | null>(null);

  // Fetch highscores from database, don't really need to use react query for this
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const data = await fetch(
          `${process.env.REACT_APP_API_URL}/api/highscores`
        );
        const scores = await data.json();
        setHighScores(scores);
      } catch {
        setHighScores(null);
      }
    };
    try {
      fetchHighScores();
    } catch {
      setHighScores(null);
    }
  }, []);

  return (
    <>
      <h1 className="text-white">HighScore</h1>
      <table>
        <tbody>
          <tr className="tbl-header">
            <th>Player</th>
            <th>Score</th>
          </tr>
          {highScores ? (
            <Score scores={highScores} />
          ) : (
            <tr>
              <td>High Scores Unavailable</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Highscore;
