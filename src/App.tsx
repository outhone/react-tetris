// import { useSelector } from 'react-redux';
// import type { RootState } from './store';

import './App.css';
import Home from './components/home/Home';
import Tetris from './components/tetris/Tetris';
import { useViewContext } from './context/ViewProvider';

const App = () => {
  // const view = useSelector((state: RootState) => state.page.view);
  const {
    state: { view },
  } = useViewContext();

  const getView = () => {
    if (view === 'single-game') {
      return <Tetris />;
    }
    return <Home />;
  };

  return <div className="App">{getView()}</div>;
};

export default App;
