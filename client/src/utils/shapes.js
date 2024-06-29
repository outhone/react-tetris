export const SHAPES = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
    ],
    color: '80, 227, 230',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0],
    ],
    color: '36, 95, 223',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L'],
    ],
    color: '223, 173, 36',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O'],
    ],
    color: '223, 217, 36',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0],
    ],
    color: '48, 211, 56',
  },
  T: {
    shape: [
      ['T', 'T', 'T'],
      [0, 'T', 0],
      [0, 0, 0],
    ],
    color: '132, 61, 198',
  },
  Z: {
    shape: [
      ['Z', 'Z', 0],
      [0, 'Z', 'Z'],
      [0, 0, 0],
    ],
    color: '227, 78, 78',
  },
};

export const CUSTOM_SHAPES = {
  U: {
    shape: [
      ['U', 0, 'U'],
      ['U', 'U', 'U'],
      [0, 0, 0],
    ],
    color: '255, 20, 147',
  },
};

export const ALL_SHAPES = { ...SHAPES, ...CUSTOM_SHAPES };

export const randomShape = () => {
  const customShapes = JSON.parse(localStorage.getItem('settings'));
  // Todo: Use letters to get all shapes instead of using full object
  const allShapes = customShapes ? { ...SHAPES, ...customShapes } : SHAPES;
  const shapes = `IJLOSTZ${customShapes ? Object.keys(customShapes) : ''}`;
  const randShape = shapes[Math.floor(Math.random() * shapes.length)];
  return allShapes[randShape];
};
