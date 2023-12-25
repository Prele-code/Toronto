const GameOver = ({ correctCount, wrongCount, handleRestart }) => (
  <div className="game-over">
    <p className="verdict">End of the Game! You&apos;ve made 5 attempts.</p>
    <p className="correct">Right Answers: {correctCount}</p>
    <p className="wrong">Wrong Answers: {wrongCount}</p>
    <br />
    <button onClick={handleRestart}>One More Time</button>
  </div>
);

export default GameOver;
