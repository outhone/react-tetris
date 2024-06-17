type StartButtonType = {
  callback: () => void;
};

const StartButton = ({ callback }: StartButtonType) => (
  <button className="gameBtn" onClick={callback} type="button">
    Start Game
  </button>
);

export default StartButton;
