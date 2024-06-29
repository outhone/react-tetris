// import { useSelector } from 'react-redux';
// import type { RootState } from './store';

import { lazy, Suspense } from 'react';
import './App.css';
import { useViewContext } from './context/ViewProvider';
import LoadingIndicator from './components/common/LoadingIndicator';

const Home = lazy(() => import('./components/home/Home'));
const Tetris = lazy(() => import('./components/tetris/Tetris'));
const Settings = lazy(() => import('./components/settings/Settings'));

const PAGES = {
  home: Home,
  'single-game': Tetris,
  settings: Settings,
};

const App = () => {
  // const view = useSelector((state: RootState) => state.page.view);
  const {
    state: { view },
  } = useViewContext();

  const Handler = PAGES[view] || Home;

  return (
    <div className="App tetrisWrapper">
      <Suspense fallback={<LoadingIndicator />}>
        <Handler />
      </Suspense>
    </div>
  );
};

export default App;
