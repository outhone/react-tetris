import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useMemo,
} from 'react';

export enum ViewActionType {
  SET_HOME,
  SET_SINGLE_GAME,
}

type Action =
  | { type: ViewActionType.SET_HOME }
  | { type: ViewActionType.SET_SINGLE_GAME };

type ViewState = {
  view: 'home' | 'single-game';
};

type ViewContextType = {
  state: ViewState;
  dispatch: Dispatch<Action>;
};

const initialState: ViewState = {
  view: 'home',
};

const reducer = (state: ViewState, action: Action): ViewState => {
  switch (action.type) {
    case ViewActionType.SET_HOME:
      return { ...state, view: 'home' };
    case ViewActionType.SET_SINGLE_GAME:
      return { ...state, view: 'single-game' };
    default:
      return state;
  }
};

const ViewContext = createContext<ViewContextType>({
  state: initialState,
  dispatch: () => {},
});

export const ViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
};

export const useViewContext = () => useContext(ViewContext);
