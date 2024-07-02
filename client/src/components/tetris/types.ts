import { AllShapeKeys } from '../../utils/shapes';

export type CellType = {
  type: AllShapeKeys;
};

export interface StyledCellType extends CellType {
  color: string;
}

export type StageType = {
  stage: [AllShapeKeys, string][][];
};
