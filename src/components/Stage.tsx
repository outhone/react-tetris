import { SHAPES } from '../utils/shapes';
import Cell from './Cell';

type ShapeType = keyof typeof SHAPES;

type StageType = {
  stage: Array<Array<ShapeType>>;
};

const Stage = ({ stage }: StageType) => (
  <div className="stageComponent">
    {
      // eslint-disable-next-line react/no-array-index-key
      stage.map((row) => row.map((cell, x) => <Cell key={x} type={0} />))
    }
  </div>
);

export default Stage;
