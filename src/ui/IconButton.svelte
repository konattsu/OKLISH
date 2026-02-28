<script lang="ts">
  import type { Snippet } from 'svelte';
  import { themeState } from '../theme/theme.svelte.ts';

  interface Props {
    title?: string;
    active?: boolean;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { title, active = false, onclick, children }: Props = $props();

  const colors = $derived(themeState.theme.colors);
</script>

<button
  class="icon-btn"
  class:active
  style="color:{active ? colors.accent : colors.textSecondary};"
  {title}
  {onclick}
>
  {@render children()}
</button>

<style>
  .icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding: 0;
  }
  .icon-btn:hover { opacity: 0.7; }
</style>
