<script lang="ts">
  import JsonViewer from '../../ui/JsonViewer.svelte';

  interface Props {
    data: unknown;
  }

  let { data }: Props = $props();
</script>

<div class="object-inspector">
  <JsonViewer {data} />
</div>

<style>
  .object-inspector { font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; font-size: 12px; }
</style>
