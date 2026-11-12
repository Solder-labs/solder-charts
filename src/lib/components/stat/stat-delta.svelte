<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = PartProps<HTMLSpanElement> & {
    /** Change as a number, e.g. 12.4 for +12.4%. Drives `data-trend`. */
    value: number;
    /** Set when a decrease is good news (e.g. churn, latency). Drives `data-sentiment`. */
    invert?: boolean;
    format?: (value: number) => string;
  };

  let { ref = $bindable(null), value, invert = false, format, children, child, ...rest }: Props = $props();

  const trend = $derived(value > 0 ? 'up' : value < 0 ? 'down' : 'flat');
  const sentiment = $derived(
    trend === 'flat' ? 'neutral' : (trend === 'up') !== invert ? 'positive' : 'negative'
  );
  const text = $derived(
    format ? format(value) : `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value).toLocaleString()}%`
  );
  const merged = $derived({ 'data-stat-delta': '', 'data-trend': trend, 'data-sentiment': sentiment, ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <span bind:this={ref} {...merged}>{#if children}{@render children()}{:else}{text}{/if}</span>
{/if}
