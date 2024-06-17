// import { useSelector } from 'react-redux';
// import type { RootState } from './store';

import './App.css';
import Home from './components/home/Home';
import Tetris from './components/tetris/Tetris';
import { useViewContext } from './context/ViewProvider';

const PAGES = {
  home: Home,
  'single-game': Tetris,
};

const App = () => {
  // const view = useSelector((state: RootState) => state.page.view);
  const {
    state: { view },
  } = useViewContext();

  const Handler = PAGES[view] || Home;

  return (
    <div className="App">
      <Handler />
    </div>
  );
};

export default App;
