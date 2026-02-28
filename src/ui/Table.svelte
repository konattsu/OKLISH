<script lang="ts">
  import { themeState } from '../theme/theme.svelte.ts';

  interface Column {
    key: string;
    label: string;
    width?: string;
  }

  interface Props {
    columns: Column[];
    rows: Record<string, unknown>[];
    selectedIndex?: number;
    onselect?: (index: number) => void;
  }

  let { columns, rows, selectedIndex = -1, onselect }: Props = $props();

  const colors = $derived(themeState.theme.colors);
</script>

<div class="table-wrap">
  <table style="color:{colors.text};">
    <thead>
      <tr style="background:{colors.bgSecondary};border-bottom:1px solid {colors.border};">
        {#each columns as col}
          <th style="width:{col.width ?? 'auto'};">{col.label}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, i}
        <tr
          class:selected={i === selectedIndex}
          style="background:{i === selectedIndex ? colors.selection : 'transparent'};"
          onclick={() => onselect?.(i)}
        >
          {#each columns as col}
            <td>{String(row[col.key] ?? '')}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrap { overflow: auto; height: 100%; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { text-align: left; padding: 3px 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  th { font-weight: 500; position: sticky; top: 0; z-index: 1; font-size: 11px; }
  tr { cursor: pointer; }
  tr:hover { opacity: 0.9; }
</style>
