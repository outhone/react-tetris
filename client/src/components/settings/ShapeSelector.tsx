import './Settings.css';
import { useState } from 'react';
import { CUSTOM_SHAPES } from '../../utils/shapes';

// ToDo: UI for shape selector

const ShapeSelector = () => {
  const [selected, setSelected] = useState(
    JSON.parse(sessionStorage.getItem('custom_shapes') || '[]')
  );

  const onSelected = (opt: string, e: React.MouseEvent<HTMLElement>) => {
    if (selected.indexOf(opt) < 0) {
      const newSelected = [...selected, opt];
      setSelected(newSelected);
      sessionStorage.setItem('custom_shapes', JSON.stringify(newSelected));
    } else {
      const newSelected = selected.filter((item: string) => item !== opt);
      setSelected(newSelected);
      sessionStorage.setItem('custom_shapes', JSON.stringify(newSelected));
    }
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
            {shape}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;
