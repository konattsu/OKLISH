<script lang="ts">
  import { themeState } from '../../theme/theme.svelte.ts';

  interface Props {
    duration: number;
    maxDuration: number;
  }

  let { duration, maxDuration }: Props = $props();

  const colors = $derived(themeState.theme.colors);
  const widthPercent = $derived(maxDuration > 0 ? Math.max(2, (duration / maxDuration) * 100) : 0);
</script>

<div class="timing-bar">
  <div class="bar" style="width:{widthPercent}%;background:{colors.accent};"></div>
</div>

<style>
  .timing-bar { height: 8px; border-radius: 2px; overflow: hidden; background: transparent; }
  .bar { height: 100%; border-radius: 2px; min-width: 2px; transition: width 0.2s; }
</style>
