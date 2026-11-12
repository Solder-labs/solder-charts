<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { PartProps } from '../../types.js';
  import { getChartContext, type LegendItem } from './context.svelte.js';

  type Props = Omit<PartProps<HTMLDivElement>, 'children' | 'child'> & {
    /** Custom item renderer. */
    item?: Snippet<[{ item: LegendItem; toggle: () => void; highlighted: boolean; highlight: (on: boolean) => void }]>;
  };

  let { ref = $bindable(null), item, ...rest }: Props = $props();
  const ctx = getChartContext();
</script>

<div bind:this={ref} data-chart-legend="" data-highlighting={ctx?.highlighted != null ? '' : undefined} {...rest}>
  {#each ctx?.items ?? [] as it (it.name)}
    {#if item}
      {@render item({
        item: it,
        toggle: () => ctx?.toggle(it.name),
        highlighted: ctx?.highlighted === it.name,
        highlight: (on: boolean) => ctx?.highlight(on ? it.name : null)
      })}
    {:else}
      <button
        type="button"
        data-chart-legend-item=""
        data-active={it.active ? '' : undefined}
        data-highlighted={ctx?.highlighted === it.name ? '' : undefined}
        onpointerenter={() => ctx?.highlight(it.name)}
        onpointerleave={() => ctx?.highlight(null)}
        onfocus={() => ctx?.highlight(it.name)}
        onblur={() => ctx?.highlight(null)}
        aria-pressed={it.active}
        style:--chart-legend-color={it.color}
        onclick={() => ctx?.toggle(it.name)}
      >
        <span data-chart-legend-marker=""></span>
        <span data-chart-legend-label="">{it.name}</span>
      </button>
    {/if}
  {/each}
</div>
