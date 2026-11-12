<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import StatRoot from '$lib/components/stat/stat-root.svelte';
  import { Stat, Sparkline } from '$lib/index.js';
  import { spark } from './data.js';

  const { Story } = defineMeta({
    title: 'Statistics/Stat',
    component: StatRoot
  });
</script>

<Story name="KPI with sparkline">
  <Stat.Root style="max-width: 280px">
    <Stat.Label>Monthly revenue</Stat.Label>
    <Stat.Value>€118,400</Stat.Value>
    <Stat.Delta value={12.4} />
    <Stat.Chart><Sparkline data={spark} /></Stat.Chart>
  </Stat.Root>
</Story>

<Story name="Inverted delta (lower is better)">
  <Stat.Root style="max-width: 280px">
    <Stat.Label>Churn</Stat.Label>
    <Stat.Value>2.1%</Stat.Value>
    <Stat.Delta value={-0.4} invert />
    <Stat.Chart><Sparkline data={[...spark].reverse()} color="var(--chart-color-3)" /></Stat.Chart>
  </Stat.Root>
</Story>

<Story name="Restyled with your own classes">
  <Stat.Root class="custom" style="max-width: 280px">
    <Stat.Label>Unstyled hooks</Stat.Label>
    <Stat.Value>42</Stat.Value>
    <Stat.Delta value={3} />
  </Stat.Root>
  <style>
    :global(.custom) {
      --chart-radius: 2px;
      border: 2px solid currentColor;
      background: #fef3c7;
      color: #451a03;
    }
  </style>
</Story>
