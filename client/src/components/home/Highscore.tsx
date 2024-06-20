import { useState, useEffect } from 'react';

type ScoreType = {
  name: string;
  score: number;
};

type ScoresType = {
  scores: ScoreType[];
};

const Score = ({ scores }: ScoresType) => {
  if (scores.length <= 0) {
    return (
      <tr>
        <td colSpan={2}>Be the first to get a high score!</td>
      </tr>
    );
  }
  return (
    <>
      {scores.map((playerScore: ScoreType) => (
        <tr key={`${playerScore.name}-${playerScore.score}`}>
          <td>{playerScore.name}</td>
          <td>{playerScore.score}</td>
        </tr>
      ))}
    </>
  );
};

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

  const addHighScore = async () => {
    try {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/api/highscores`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: 'John',
            score: 10000,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      console.log(`Successful: ${data}`);
    } catch {
      console.log('error adding high score');
    }
  };

  return (
    <>
      <button type="button" onClick={() => addHighScore()}>
        Add High Score
      </button>
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
              <td colSpan={2}>High Scores Unavailable</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Highscore;
