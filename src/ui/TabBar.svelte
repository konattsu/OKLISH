<script lang="ts">
  import { themeState } from '../theme/theme.svelte.ts';

  interface Tab {
    name: string;
    label: string;
  }

  interface Props {
    tabs: Tab[];
    active: string;
    onselect: (name: string) => void;
  }

  let { tabs, active, onselect }: Props = $props();

  const colors = $derived(themeState.theme.colors);
</script>

<div class="tabbar" style="border-bottom:1px solid {colors.border};">
  {#each tabs as tab}
    <button
      class="tab"
      class:active={active === tab.name}
      style="color:{active === tab.name ? colors.text : colors.textSecondary};border-bottom-color:{active === tab.name ? colors.accent : 'transparent'};"
      onclick={() => onselect(tab.name)}
    >
      {tab.label}
    </button>
  {/each}
</div>

<style>
  .tabbar { display: flex; gap: 0; background: transparent; height: 28px; }
  .tab {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 0 10px;
    font-size: 11px;
    font-family: inherit;
    cursor: pointer;
    white-space: nowrap;
  }
  .tab:hover { opacity: 0.8; }
</style>
