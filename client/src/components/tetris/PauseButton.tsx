import GameButton from '../common/GameButton';

type PauseButtonType = {
  callback: () => void;
  status: boolean;
};

const PauseButton = ({ callback, status }: PauseButtonType) => (
  <GameButton
    callback={callback}
    text={status ? 'Resume Game' : 'Pause Game'}
  />
);

export default PauseButton;
