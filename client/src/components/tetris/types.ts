import { SHAPES, CUSTOM_SHAPES } from '../../utils/shapes';

export type ShapeType = keyof typeof SHAPES;
export type CustomShapeType = keyof typeof CUSTOM_SHAPES;

export type CellType = {
  type: ShapeType | CustomShapeType;
};

export interface StyledCellType extends CellType {
  color: string;
}

export type StageType = {
  stage: [ShapeType, string][][];
};
