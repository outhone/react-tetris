type GameButtonProps = {
  callback: () => void;
  text: string;
};

const GameButton = ({ callback, text }: GameButtonProps) => (
  <button className="gameBtn" onClick={callback} type="button">
    {text}
  </button>
);

export default GameButton;
