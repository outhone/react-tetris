type StartButtonType = {
  callback: () => void;
};

const StartButton = ({ callback }: StartButtonType) => (
  <button className="startBtn" onClick={callback} type="button">
    Start Game
  </button>
);

export default StartButton;
