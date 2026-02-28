<script lang="ts">
  import { themeState } from '../theme/theme.svelte.ts';

  interface Props {
    variant?: 'default' | 'error' | 'warning' | 'success' | 'info';
    children: import('svelte').Snippet;
  }

  let { variant = 'default', children }: Props = $props();

  const colors = $derived(themeState.theme.colors);

  const variantColor = $derived(
    variant === 'error' ? colors.error :
    variant === 'warning' ? colors.warning :
    variant === 'success' ? colors.success :
    variant === 'info' ? colors.info :
    colors.textMuted
  );
</script>

<span class="badge" style="color:{variantColor};border:1px solid {variantColor}33;">
  {@render children()}
</span>

<style>
  .badge {
    font-size: 10px;
    padding: 1px 5px;
    border-radius: 3px;
    font-family: inherit;
    display: inline-flex;
    align-items: center;
  }
</style>
