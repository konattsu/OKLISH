<script lang="ts">
  import { themeState } from '../../theme/theme.svelte.ts';
  import { networkState } from './network.svelte.ts';
  import RequestList from './RequestList.svelte';
  import RequestDetail from './RequestDetail.svelte';
  import SplitPane from '../../ui/SplitPane.svelte';
  import SearchInput from '../../ui/SearchInput.svelte';

  const colors = $derived(themeState.theme.colors);
</script>

<div class="network-panel">
  <div class="toolbar" style="border-bottom:1px solid {colors.border};background:{colors.bgSecondary};">
    <button class="clear-btn" style="color:{colors.textSecondary};" title="Clear" onclick={() => networkState.clear()}>
      ⊘
    </button>
    <SearchInput value={networkState.searchQuery} onchange={(v) => networkState.setSearch(v)} placeholder="Filter URL..." />
    <span class="count" style="color:{colors.textMuted};">{networkState.requests.length} requests</span>
  </div>

  <div class="main">
    {#if networkState.selectedRequest}
      {#snippet first()}
        <RequestList />
      {/snippet}
      {#snippet second()}
        <RequestDetail />
      {/snippet}
      <SplitPane direction="vertical" initialRatio={0.5} {first} {second} />
    {:else}
      <RequestList />
    {/if}
  </div>
</div>

<style>
  .network-panel { display: flex; flex-direction: column; height: 100%; }
  .toolbar { display: flex; align-items: center; gap: 8px; padding: 4px 8px; flex-shrink: 0; }
  .clear-btn { background: none; border: none; cursor: pointer; font-size: 14px; padding: 0 4px; }
  .clear-btn:hover { opacity: 0.7; }
  .count { font-size: 11px; flex-shrink: 0; }
  .main { flex: 1; min-height: 0; }
</style>
