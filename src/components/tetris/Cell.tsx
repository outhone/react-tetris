import { SHAPES } from '../../utils/shapes';
import type { StyledCellType, CellType } from './types';

const StyledCell = ({ type, color }: StyledCellType) => (
  <div
    style={{
      width: 'auto',
      background: `rgba(${color}, 0.8)`,
      border: `${type === 0 ? '0px solid ' : '4px solid'}`,
      borderColor: `rgb${color}`,
      borderBottomColor: `rgba(${color}, 0.1)`,
      borderRightColor: `rgba(${color}, 1)`,
      borderTopColor: `rgba(${color}, 1)`,
      borderLeftColor: `rgba(${color}, 0.3)`,
    }}
  />
);

const Cell = ({ type }: CellType) => (
  <StyledCell type={type} color={SHAPES[type].color} />
);

export default Cell;
