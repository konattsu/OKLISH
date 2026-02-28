<script lang="ts">
  import type { Snippet } from 'svelte';
  import { themeState } from '../theme/theme.svelte.ts';

  interface Props {
    text: string;
    children: Snippet;
  }

  let { text, children }: Props = $props();

  const colors = $derived(themeState.theme.colors);
  let show = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
  class="tooltip-wrap"
  onmouseenter={() => show = true}
  onmouseleave={() => show = false}
>
  {@render children()}
  {#if show}
    <span class="tooltip-text" style="background:{colors.bgTertiary};color:{colors.text};border:1px solid {colors.border};">
      {text}
    </span>
  {/if}
</span>

<style>
  .tooltip-wrap { position: relative; display: inline-flex; }
  .tooltip-text {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 8px;
    font-size: 11px;
    white-space: nowrap;
    border-radius: 4px;
    pointer-events: none;
    z-index: 10;
    margin-bottom: 4px;
  }
</style>
