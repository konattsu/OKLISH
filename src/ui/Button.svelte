<script lang="ts">
  import type { Snippet } from 'svelte';
  import { themeState } from '../theme/theme.svelte.ts';

  interface Props {
    variant?: 'default' | 'primary' | 'danger';
    size?: 'sm' | 'md';
    disabled?: boolean;
    onclick?: (e: MouseEvent) => void;
    children: Snippet;
  }

  let { variant = 'default', size = 'sm', disabled = false, onclick, children }: Props = $props();

  const colors = $derived(themeState.theme.colors);
</script>

<button
  class="btn btn-{variant} btn-{size}"
  style="
    color:{variant === 'primary' ? '#fff' : colors.text};
    background:{variant === 'primary' ? colors.accent : variant === 'danger' ? colors.error : colors.bgTertiary};
    border:1px solid {colors.border};
  "
  {disabled}
  {onclick}
>
  {@render children()}
</button>

<style>
  .btn {
    border-radius: 4px;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn:hover:not(:disabled) { opacity: 0.85; }
  .btn-sm { padding: 2px 8px; height: 24px; }
  .btn-md { padding: 4px 12px; height: 28px; }
</style>
