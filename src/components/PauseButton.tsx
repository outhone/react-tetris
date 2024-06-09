type PauseButtonType = {
  callback: () => void;
  status: boolean;
};

const PauseButton = ({ callback, status }: PauseButtonType) => (
  <button className="startBtn" onClick={callback} type="button">
    {status ? 'Resume Game' : 'Pause Game'}
  </button>
);

export default PauseButton;
