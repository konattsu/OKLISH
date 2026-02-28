<script lang="ts">
  import { themeState } from '../../theme/theme.svelte.ts';
  import DomNode from './DomNode.svelte';

  const colors = $derived(themeState.theme.colors);
  const rootElement = $derived(document.documentElement);
</script>

<div class="dom-tree" style="background:{colors.bg};">
  {#if rootElement}
    <DomNode element={rootElement} />
  {/if}
</div>

<style>
  .dom-tree { overflow: auto; height: 100%; padding: 4px 0; }
</style>
