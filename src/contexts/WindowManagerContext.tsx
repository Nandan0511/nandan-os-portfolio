'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { WindowState, WindowAction, WindowPosition, WindowSize } from '@/types';
import { appRegistry } from '@/data/apps';

interface WindowManagerContextProps {
  windows: WindowState[];
  openWindow: (appId: string, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: WindowPosition) => void;
  updateSize: (id: string, size: WindowSize) => void;
  closeAll: () => void;
}

const WindowManagerContext = createContext<WindowManagerContextProps | undefined>(undefined);

interface WindowManagerState {
  windows: WindowState[];
  nextZIndex: number;
}

const initialState: WindowManagerState = {
  windows: [],
  nextZIndex: 10
};

function windowReducer(state: WindowManagerState, action: WindowAction): WindowManagerState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { appId, title } = action.payload;

      // 1. Check if window is already open
      const existingWindow = state.windows.find((w) => w.appId === appId);
      if (existingWindow) {
        // If minimized, restore it; always focus it
        return {
          ...state,
          nextZIndex: state.nextZIndex + 1,
          windows: state.windows.map((w) =>
            w.appId === appId
              ? {
                  ...w,
                  isMinimized: false,
                  isActive: true,
                  zIndex: state.nextZIndex + 1
                }
              : { ...w, isActive: false }
          )
        };
      }

      // 2. Look up details in appRegistry
      const appDef = appRegistry.find((app) => app.id === appId);
      if (!appDef) return state;

      const windowId = `${appId}-${Date.now()}`;
      
      // Calculate cascading offsets to prevent absolute overlapping
      const offset = (state.windows.length % 6) * 30;
      const initialPos = {
        x: 60 + offset,
        y: 60 + offset
      };

      const newWindow: WindowState = {
        id: windowId,
        appId,
        title: title || appDef.title,
        position: initialPos,
        size: appDef.defaultSize,
        minSize: appDef.minSize,
        isMinimized: false,
        isMaximized: false,
        isActive: true,
        zIndex: state.nextZIndex + 1
      };

      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        windows: state.windows
          .map((w) => ({ ...w, isActive: false }))
          .concat(newWindow)
      };
    }

    case 'CLOSE_WINDOW': {
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.payload.id)
      };
    }

    case 'MINIMIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: true, isActive: false }
            : w
        )
      };
    }

    case 'MAXIMIZE_WINDOW': {
      const targetZIndex = state.nextZIndex + 1;
      return {
        ...state,
        nextZIndex: targetZIndex,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMaximized: true, isMinimized: false, isActive: true, zIndex: targetZIndex }
            : { ...w, isActive: false }
        )
      };
    }

    case 'RESTORE_WINDOW': {
      const targetZIndex = state.nextZIndex + 1;
      return {
        ...state,
        nextZIndex: targetZIndex,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isMinimized: false, isMaximized: false, isActive: true, zIndex: targetZIndex }
            : { ...w, isActive: false }
        )
      };
    }

    case 'FOCUS_WINDOW': {
      const targetWindow = state.windows.find((w) => w.id === action.payload.id);
      if (!targetWindow || targetWindow.isActive) return state;

      const targetZIndex = state.nextZIndex + 1;
      return {
        ...state,
        nextZIndex: targetZIndex,
        windows: state.windows.map((w) =>
          w.id === action.payload.id
            ? { ...w, isActive: true, isMinimized: false, zIndex: targetZIndex }
            : { ...w, isActive: false }
        )
      };
    }

    case 'UPDATE_POSITION': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, position: action.payload.position } : w
        )
      };
    }

    case 'UPDATE_SIZE': {
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.payload.id ? { ...w, size: action.payload.size } : w
        )
      };
    }

    case 'CLOSE_ALL': {
      return {
        ...state,
        windows: []
      };
    }

    default:
      return state;
  }
}

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(windowReducer, initialState);

  const openWindow = useCallback((appId: string, title?: string) => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId, title } });
  }, []);

  const closeWindow = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_WINDOW', payload: { id } });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { id } });
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { id } });
  }, []);

  const restoreWindow = useCallback((id: string) => {
    dispatch({ type: 'RESTORE_WINDOW', payload: { id } });
  }, []);

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: 'FOCUS_WINDOW', payload: { id } });
  }, []);

  const updatePosition = useCallback((id: string, position: WindowPosition) => {
    dispatch({ type: 'UPDATE_POSITION', payload: { id, position } });
  }, []);

  const updateSize = useCallback((id: string, size: WindowSize) => {
    dispatch({ type: 'UPDATE_SIZE', payload: { id, size } });
  }, []);

  const closeAll = useCallback(() => {
    dispatch({ type: 'CLOSE_ALL' });
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows: state.windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updatePosition,
        updateSize,
        closeAll
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}
