<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getChartContext } from '../chart/context.svelte.js';

  export interface PercentageBarItem {
    label: string;
    value: number;
    /** Any CSS colour; defaults to `--chart-color-N`. */
    color?: string;
    /** Text for assistive tech, e.g. "25%". */
    displayValue?: string;
  }

  type Props = Omit<PartProps<HTMLDivElement>, 'children' | 'child'> & { items: PercentageBarItem[] };

  let { ref = $bindable(null), items, ...rest }: Props = $props();

  // Inside a Chart.LegendScope / Chart.Root this publishes its items to the legend and syncs hover.
  const ctx = getChartContext();

  const colorOf = (i: PercentageBarItem, idx: number) => i.color ?? `var(--chart-color-${(idx % 8) + 1})`;
  const safe = $derived(items.map((i) => ({ ...i, value: Math.max(0, Number.isFinite(i.value) ? i.value : 0) })));
  const total = $derived(safe.reduce((a, i) => a + i.value, 0));
  const summary = $derived(
    safe.map((i) => `${i.label}: ${i.displayValue ?? `${Math.round(total ? (i.value / total) * 100 : 0)}%`}`).join(', ')
  );

  $effect(() => {
    if (ctx) ctx.items = safe.map((i, idx) => ({ name: i.label, color: colorOf(i, idx), active: true }));
  });
</script>

<div
  bind:this={ref}
  data-percentage-bar=""
  data-highlighting={ctx?.highlighted != null ? '' : undefined}
  role="img"
  aria-label={summary}
  {...rest}
>
  {#each safe as item, idx (item.label)}
    <span
      data-percentage-bar-segment=""
      role="presentation"
      data-highlighted={ctx?.highlighted === item.label ? '' : undefined}
      style:flex-grow={item.value}
      style:--segment-color={colorOf(item, idx)}
      onpointerenter={() => ctx?.highlight(item.label)}
      onpointerleave={() => ctx?.highlight(null)}
    ></span>
  {/each}
</div>
