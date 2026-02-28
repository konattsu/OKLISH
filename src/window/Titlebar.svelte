<script lang="ts">
  import { themeState } from '../theme/theme.svelte.ts';
  import { windowState } from './window.svelte.ts';
  import { panelRegistry } from '../panels/registry.svelte.ts';

  interface Props {
    ondragstart?: (e: PointerEvent) => void;
    onclose?: () => void;
  }

  let { ondragstart, onclose }: Props = $props();

  const colors = $derived(themeState.theme.colors);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="titlebar" style="background:{colors.bgSecondary};border-bottom:1px solid {colors.border};" onpointerdown={ondragstart}>
  <div class="tabs">
    {#each panelRegistry.panels as panel}
      <button
        class="tab"
        class:active={panelRegistry.activePanel === panel.name}
        style="color:{panelRegistry.activePanel === panel.name ? colors.text : colors.textSecondary};background:{panelRegistry.activePanel === panel.name ? colors.bg : 'transparent'};border-bottom:{panelRegistry.activePanel === panel.name ? `2px solid ${colors.accent}` : '2px solid transparent'};"
        onclick={() => panelRegistry.setActive(panel.name)}
        onpointerdown={(e) => e.stopPropagation()}
      >
        {panel.label}
      </button>
    {/each}
  </div>
  <div class="actions" onpointerdown={(e) => e.stopPropagation()}>
    <button class="action-btn" style="color:{colors.textSecondary}" title="Switch window mode" onclick={() => windowState.cycleMode()}>
      {windowState.isFloating ? '\u229E' : '\u229F'}
    </button>
    <button class="action-btn" style="color:{colors.textSecondary}" title="Minimize" onclick={() => windowState.minimized = true}>
      \u2500
    </button>
    {#if onclose}
      <button class="action-btn close-btn" style="color:{colors.textSecondary}" title="Close" onclick={onclose}>
        \u2715
      </button>
    {/if}
  </div>
</div>

<style>
  .titlebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 0 4px;
    user-select: none;
    cursor: grab;
    flex-shrink: 0;
  }
  .titlebar:active { cursor: grabbing; }
  .tabs {
    display: flex;
    gap: 0;
    overflow-x: auto;
    flex: 1;
    height: 100%;
  }
  .tab {
    border: none;
    padding: 0 12px;
    font-size: 12px;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tab:hover { opacity: 0.8; }
  .actions {
    display: flex;
    gap: 2px;
    align-items: center;
    padding: 0 2px;
  }
  .action-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
  .action-btn:hover { opacity: 0.7; }
  .close-btn:hover { background: #e81123; color: #fff !important; }
</style>
