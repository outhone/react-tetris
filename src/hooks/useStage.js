import { useState } from 'react';

import { createStage } from '../utils/gameHelpers';

const useStage = (player, resetPlayer) => {
  console.log(player);
  console.log(resetPlayer);

  const [stage, setStage] = useState(createStage());

  return { stage, setStage };
};

export default useStage;
