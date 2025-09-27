import { renderOKLISH } from './root';
import { FrameMode } from './types/frame';

const OKLISH = {
  /**
   * Initialize OKLISH UI
   * @param mode 'floating' (default) or 'fixed'
   */
  init: (mode: FrameMode = 'floating'): void => {
    renderOKLISH(mode);
  },
};

// Register OKLISH to window for UMD global export
if (typeof window !== 'undefined') {
  // @ts-expect-error: Assigning to window for UMD global export
  window.OKLISH = OKLISH;
}

export default OKLISH;
