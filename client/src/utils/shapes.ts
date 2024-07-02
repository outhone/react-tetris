type ShapeType = {
  [key: string | number]: {
    shape: (string | number)[][];
    color: string;
  };
};

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
  W: {
    shape: [
      [0, 0, 'W'],
      [0, 'W', 'W'],
      ['W', 'W', 0],
    ],
    color: '255, 127, 0',
  },
  B: {
    shape: [
      ['B', 0, 0],
      ['B', 'B', 0],
      ['B', 'B', 0],
    ],
    color: '0, 255, 127',
  },
  A: {
    shape: [
      [0, 'A', 0],
      [0, 0, 0],
    ],
    color: '255, 255, 241',
  },
};

export const ALL_SHAPES = { ...SHAPES, ...CUSTOM_SHAPES };

export type ShapeKeys = keyof typeof SHAPES;
export type CustomShapeKeys = keyof typeof CUSTOM_SHAPES;
export type AllShapeKeys = ShapeKeys | CustomShapeKeys;

// ToDo: Optimize this function, no need to always get customShapes and calculating shapes
export const randomShape = () => {
  const customShapes = JSON.parse(
    sessionStorage.getItem('custom_shapes') || '[]'
  );
  const allShapes: ShapeType = { ...SHAPES };

  customShapes.forEach((shape: CustomShapeKeys) => {
    allShapes[shape] = CUSTOM_SHAPES[shape];
  });

  const shapes = Object.keys(allShapes).filter((key) => key !== '0');
  const randShape = shapes[Math.floor(Math.random() * shapes.length)];
  return allShapes[randShape];
};
