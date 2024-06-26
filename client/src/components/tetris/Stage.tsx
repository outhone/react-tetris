import Cell from './Cell';
import type { StageType } from './types';

const Stage = ({ stage }: StageType) => (
  <div className="stageComponent">
    {stage.map((row) =>
      // eslint-disable-next-line react/no-array-index-key
      row.map((cell, x) => <Cell key={x} type={cell[0]} />)
    )}
  </div>
);

export default Stage;
