import { SHAPES } from '../utils/shapes';

export type ShapeType = keyof typeof SHAPES;

export type CellType = {
  type: ShapeType;
};

export interface StyledCellType extends CellType {
  color: string;
}

export type StageType = {
  stage: [ShapeType, string][][];
};
