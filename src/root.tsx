import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeProvider } from './context/ThemeContext';
import { FixedWindow } from './frame/FixedWindow';
import { FloatingWindow } from './frame/FloatingWindow';
import type {
  FloatingWindowDimensions,
  FloatingWindowPositioning,
  FloatingWindowState,
} from './types/floatingWindow';
import { FrameMode } from './types/frame';

const defaultDimensions: FloatingWindowDimensions = {
  minWidth: 400,
  minHeight: 300,
  maxWidth: window.innerWidth * 0.9,
  maxHeight: window.innerHeight * 0.9,
  defaultWidth: 800,
  defaultHeight: 600,
};
const defaultPositioning: FloatingWindowPositioning = {
  draggable: true,
  resizable: true,
  snapToEdges: true,
  constrainToViewport: true,
};
const defaultWindowState: FloatingWindowState = {
  minimized: false,
  maximized: false,
  docked: false,
  opacity: 1,
};

export function renderOKLISH(mode: FrameMode = 'floating'): void {
  const rootEl = document.getElementById('oklish-root');
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(
    <ThemeProvider>
      {mode === 'floating' ? (
        <FloatingWindow
          dimensions={defaultDimensions}
          positioning={defaultPositioning}
          windowState={defaultWindowState}
        >
          <div style={{ padding: 24 }}>Hello Floating Window</div>
        </FloatingWindow>
      ) : (
        <FixedWindow
          defaultWidth={200}
          defaultHeight={100}
        />
      )}
    </ThemeProvider>
  );
}
