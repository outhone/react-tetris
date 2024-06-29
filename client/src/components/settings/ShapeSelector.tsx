import './Settings.css';
import { useState } from 'react';
import { CUSTOM_SHAPES } from '../../utils/shapes';

// ToDo: UI for shape selector
// ToDo: Save only letters and not full object

const ShapeSelector = () => {
  const [selected, setSelected] = useState(
    JSON.parse(localStorage.getItem('settings') || '{}')
  );

  const onSelected = (opt: string, e: React.MouseEvent<HTMLElement>) => {
    if (Object.hasOwn(selected, opt)) {
      const newSelected = { ...selected };
      delete newSelected[opt as keyof typeof selected];
      setSelected(newSelected);
      localStorage.setItem('settings', JSON.stringify(newSelected));
    } else {
      const newSelected = {
        ...selected,
        [opt]: CUSTOM_SHAPES[opt as keyof typeof CUSTOM_SHAPES],
      };
      setSelected(newSelected);
      localStorage.setItem('settings', JSON.stringify(newSelected));
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
            className={Object.hasOwn(selected, shape) ? 'selected' : ''}
          >
            {shape}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShapeSelector;
