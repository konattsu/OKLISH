import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { FloatingWindow } from './core/FloatingWindow';
import type { Config } from './types/config';
import type {
  FloatingWindowDimensions,
  FloatingWindowPositioning,
  FloatingWindowState,
} from './types/floatingWindow';

// Default config for FloatingWindow
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

function renderFloatingWindow(config: Partial<{ theme: string }>): void {
  const rootEl = document.getElementById('oklish-root');
  if (!rootEl) return;
  const root = createRoot(rootEl);
  root.render(
    React.createElement(FloatingWindow, {
      dimensions: defaultDimensions,
      positioning: defaultPositioning,
      windowState: defaultWindowState,
      children: React.createElement(
        'div',
        { style: { color: '#fff', padding: 24 } },
        'Hello Floating Window'
      ),
    })
  );
}

// グローバルAPIはUMDバンドルに任せる
const OKLISH = {
  init: (config: Config = {}): void => {
    renderFloatingWindow(config);
  },
};

export default OKLISH;
