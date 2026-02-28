<script lang="ts">
  import { themeState } from '../../theme/theme.svelte.ts';
  import { networkState } from './network.svelte.ts';
  import JsonViewer from '../../ui/JsonViewer.svelte';
  import TabBar from '../../ui/TabBar.svelte';

  const colors = $derived(themeState.theme.colors);
  let activeTab = $state('headers');

  const req = $derived(networkState.selectedRequest);

  const tabs = [
    { name: 'headers', label: 'Headers' },
    { name: 'response', label: 'Response' },
  ];
</script>

<div class="request-detail" style="background:{colors.bg};color:{colors.text};">
  {#if req}
    <TabBar {tabs} active={activeTab} onselect={(n) => activeTab = n} />
    <div class="detail-content">
      {#if activeTab === 'headers'}
        <div class="section">
          <div class="section-title" style="color:{colors.textSecondary};">General</div>
          <div class="kv"><span class="key">URL:</span> <span class="val">{req.url}</span></div>
          <div class="kv"><span class="key">Method:</span> <span class="val">{req.method}</span></div>
          <div class="kv"><span class="key">Status:</span> <span class="val">{req.status} {req.statusText}</span></div>
        </div>
        <div class="section">
          <div class="section-title" style="color:{colors.textSecondary};">Response Headers</div>
          {#each Object.entries(req.responseHeaders) as [key, val]}
            <div class="kv"><span class="key" style="color:{colors.accent};">{key}:</span> <span class="val">{val}</span></div>
          {/each}
        </div>
        {#if Object.keys(req.requestHeaders).length > 0}
          <div class="section">
            <div class="section-title" style="color:{colors.textSecondary};">Request Headers</div>
            {#each Object.entries(req.requestHeaders) as [key, val]}
              <div class="kv"><span class="key" style="color:{colors.accent};">{key}:</span> <span class="val">{val}</span></div>
            {/each}
          </div>
        {/if}
      {:else if activeTab === 'response'}
        <div class="response-body">
          {#if req.responseBody !== null && req.responseBody !== undefined}
            <JsonViewer data={req.responseBody} maxDepth={5} />
          {:else}
            <span style="color:{colors.textMuted};">No response body</span>
          {/if}
        </div>
      {/if}
    </div>
  {:else}
    <div class="empty" style="color:{colors.textMuted};">Select a request to view details</div>
  {/if}
</div>

<style>
  .request-detail { height: 100%; display: flex; flex-direction: column; font-size: 12px; }
  .detail-content { flex: 1; overflow: auto; padding: 8px; }
  .section { margin-bottom: 12px; }
  .section-title { font-size: 11px; font-weight: 600; margin-bottom: 4px; padding-bottom: 3px; }
  .kv { padding: 1px 0; font-family: 'SF Mono', Monaco, monospace; font-size: 11px; }
  .key { font-weight: 500; }
  .val { word-break: break-all; }
  .response-body { padding: 4px; font-family: 'SF Mono', Monaco, monospace; }
  .empty { padding: 20px; text-align: center; font-size: 12px; }
</style>
