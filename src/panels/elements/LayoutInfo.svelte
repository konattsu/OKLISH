<script lang="ts">
  import { themeState } from '../../theme/theme.svelte.ts';
  import { elementsState } from './elements.svelte.ts';

  const colors = $derived(themeState.theme.colors);

  const box = $derived(() => {
    const el = elementsState.selectedElement;
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return {
      margin: { top: cs.marginTop, right: cs.marginRight, bottom: cs.marginBottom, left: cs.marginLeft },
      border: { top: cs.borderTopWidth, right: cs.borderRightWidth, bottom: cs.borderBottomWidth, left: cs.borderLeftWidth },
      padding: { top: cs.paddingTop, right: cs.paddingRight, bottom: cs.paddingBottom, left: cs.paddingLeft },
      width: cs.width,
      height: cs.height,
    };
  });
</script>

<div class="layout-info" style="background:{colors.bg};color:{colors.text};">
  {#if box()}
    {@const b = box()!}
    <div class="box-model">
      <div class="layer margin" style="border-color:{colors.warning}44;">
        <span class="label" style="color:{colors.warning};">margin</span>
        <span class="top">{b.margin.top}</span>
        <span class="right">{b.margin.right}</span>
        <span class="bottom">{b.margin.bottom}</span>
        <span class="left">{b.margin.left}</span>
        <div class="layer border-layer" style="border-color:{colors.info}44;">
          <span class="label" style="color:{colors.info};">border</span>
          <span class="top">{b.border.top}</span>
          <span class="right">{b.border.right}</span>
          <span class="bottom">{b.border.bottom}</span>
          <span class="left">{b.border.left}</span>
          <div class="layer padding-layer" style="border-color:{colors.success}44;">
            <span class="label" style="color:{colors.success};">padding</span>
            <span class="top">{b.padding.top}</span>
            <span class="right">{b.padding.right}</span>
            <span class="bottom">{b.padding.bottom}</span>
            <span class="left">{b.padding.left}</span>
            <div class="content-box" style="background:{colors.accent}22;">
              {b.width} x {b.height}
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="empty" style="color:{colors.textMuted};">Select an element to view layout</div>
  {/if}
</div>

<style>
  .layout-info { height: 100%; overflow: auto; padding: 8px; font-size: 11px; }
  .box-model { display: flex; justify-content: center; padding: 8px; }
  .layer {
    position: relative;
    border: 2px dashed;
    padding: 16px 24px;
    text-align: center;
    min-width: 60px;
  }
  .label { position: absolute; top: 2px; left: 4px; font-size: 10px; font-weight: 500; }
  .top { position: absolute; top: 2px; left: 50%; transform: translateX(-50%); }
  .bottom { position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); }
  .left { position: absolute; left: 4px; top: 50%; transform: translateY(-50%); }
  .right { position: absolute; right: 4px; top: 50%; transform: translateY(-50%); }
  .content-box { padding: 8px 12px; border-radius: 3px; font-weight: 600; }
  .empty { padding: 20px; text-align: center; font-size: 12px; }
</style>
