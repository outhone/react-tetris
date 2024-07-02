import { useState } from 'react';
import { CUSTOM_SHAPES, CustomShapeKeys } from '../../utils/shapes';
import Cell from '../tetris/Cell';

const ShapeSelector = () => {
  const [selected, setSelected] = useState(
    JSON.parse(sessionStorage.getItem('custom_shapes') || '[]')
  );

  const onSelected = (opt: string, e: React.MouseEvent<HTMLElement>) => {
    let newSelected = [];
    if (selected.indexOf(opt) < 0) {
      newSelected = [...selected, opt];
    } else {
      newSelected = selected.filter((item: string) => item !== opt);
    }
    setSelected(newSelected);
    sessionStorage.setItem('custom_shapes', JSON.stringify(newSelected));
    e.currentTarget.blur();
  };

  return (
    <div className="selectGroupContainer">
      <div className="optionsGridContainer">
        {Object.keys(CUSTOM_SHAPES).map((shape) => (
          <button
            type="button"
            key={shape}
            onClick={(e) => onSelected(shape, e)}
            className={selected.indexOf(shape) > -1 ? 'selected' : ''}
          >
            <div className="shapeContainer">
              {CUSTOM_SHAPES[shape as CustomShapeKeys].shape.map((row, x) =>
                row.map((cell, y) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Cell key={`${x}${y}`} type={cell as CustomShapeKeys} />
                ))
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;
