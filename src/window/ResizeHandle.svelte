<script lang="ts">
  import { themeState } from '../theme/theme.svelte.ts';

  interface Props {
    position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    onresize: (dx: number, dy: number) => void;
  }

  let { position, onresize }: Props = $props();

  function onpointerdown(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    function onpointermove(ev: PointerEvent) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      onresize(dx, dy);
    }

    function onpointerup() {
      target.removeEventListener('pointermove', onpointermove);
      target.removeEventListener('pointerup', onpointerup);
    }

    target.addEventListener('pointermove', onpointermove);
    target.addEventListener('pointerup', onpointerup);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="resize-handle resize-{position}"
  onpointerdown={onpointerdown}
></div>

<style>
  .resize-handle {
    position: absolute;
    z-index: 10;
  }
  .resize-top, .resize-bottom { left: 0; right: 0; height: 4px; cursor: ns-resize; }
  .resize-left, .resize-right { top: 0; bottom: 0; width: 4px; cursor: ew-resize; }
  .resize-top { top: -2px; }
  .resize-bottom { bottom: -2px; }
  .resize-left { left: -2px; }
  .resize-right { right: -2px; }
  .resize-top-left, .resize-top-right, .resize-bottom-left, .resize-bottom-right {
    width: 8px; height: 8px;
  }
  .resize-top-left { top: -4px; left: -4px; cursor: nwse-resize; }
  .resize-top-right { top: -4px; right: -4px; cursor: nesw-resize; }
  .resize-bottom-left { bottom: -4px; left: -4px; cursor: nesw-resize; }
  .resize-bottom-right { bottom: -4px; right: -4px; cursor: nwse-resize; }
</style>
