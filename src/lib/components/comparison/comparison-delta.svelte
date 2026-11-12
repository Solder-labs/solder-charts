<script lang="ts">
  import Change from '../change/change.svelte';
  import { getComparisonContext } from './context.svelte.js';

  type Props = { invert?: boolean; digits?: number } & Record<string, unknown>;
  let { invert = false, digits = 1, ...rest }: Props = $props();
  const ctx = getComparisonContext();
  const delta = $derived(ctx?.delta ?? null);
  const trend = $derived(delta === null || delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down');
  const sentiment = $derived(
    trend === 'flat' ? 'neutral' : (trend === 'up') !== invert ? 'positive' : 'negative'
  );
</script>

{#if delta !== null}
  <Change
    value={`${delta > 0 ? '+' : delta < 0 ? '−' : ''}${Math.abs(delta).toLocaleString(undefined, { maximumFractionDigits: digits })}%`}
    {trend}
    {sentiment}
    {...rest}
  />
{/if}
