<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Change, Comparison, DetailsTable, Empty, Grid, Meter, PercentageBar, Tracker, Stat, Chart,
    Sparkline, DonutChart
  } from '$lib/index.js';
  import { spark, traffic } from './data.js';

  const { Story } = defineMeta({ title: 'Statistics/Components' });

  const items = [
    { label: 'Organic', value: 0.48 },
    { label: 'Direct', value: 0.24 },
    { label: 'Referral', value: 0.16 },
    { label: 'Social', value: 0.08 },
    { label: 'Other', value: 0.04, color: 'var(--chart-muted)' }
  ];
</script>

<Story name="Change">
  <div style="display: flex; gap: 8px">
    <Change value="+12.4%" />
    <Change value="-3.7%" />
    <Change value="0%" trend="flat" />
    <Change value={-0.4} sentiment="positive" />
  </div>
</Story>

<Story name="KPI">
  <Grid xs={1} sm={2} lg={4} style="max-width: 960px">
    {#each [['Total users', '12,430', 12.4], ['Orders', '3,821', -3.7], ['Refunds', '42', 0], ['MRR', '€48.2k', 8.1]] as [label, value, change]}
      <Stat.Root>
        <Stat.Label>{label}</Stat.Label>
        <Stat.Value>{value}</Stat.Value>
        <Change value={change as number} />
      </Stat.Root>
    {/each}
  </Grid>
</Story>

<Story name="Metric (KPI + chart + footer)">
  <Stat.Root style="max-width: 360px">
    <Stat.Header><Stat.Label>Active projects</Stat.Label></Stat.Header>
    <Stat.Value>18</Stat.Value>
    <Change value="+3" trend="up" />
    <Stat.Chart><Sparkline data={spark} /></Stat.Chart>
    <Stat.Footer>vs. last month</Stat.Footer>
  </Stat.Root>
</Story>

<Story name="Comparison">
  <Comparison.Root current={284} previous={232} style="max-width: 360px">
    <Comparison.Title>New customers</Comparison.Title>
    <Comparison.Values>
      <Comparison.Item of="current" label="This quarter" />
      <Comparison.Item of="previous" label="Last quarter" />
    </Comparison.Values>
    <Comparison.Delta />
    <Comparison.Footer>this quarter</Comparison.Footer>
  </Comparison.Root>
</Story>

<Story name="Details table">
  <DetailsTable.Root style="max-width: 360px">
    <DetailsTable.Title>Order details</DetailsTable.Title>
    <DetailsTable.List>
      <DetailsTable.Row label="Status" value="Paid" />
      <DetailsTable.Row label="Total" value="€ 149.99" />
      <DetailsTable.Row label="Method">iDEAL</DetailsTable.Row>
    </DetailsTable.List>
  </DetailsTable.Root>
</Story>

<Story name="Empty">
  <Chart.Root style="max-width: 480px">
    <Chart.Title>Revenue</Chart.Title>
    <Empty.Root>
      <Empty.Icon>＋</Empty.Icon>
      <Empty.Title>No data yet</Empty.Title>
      <Empty.Description>Data will appear here once it's recorded.</Empty.Description>
      <Empty.Actions><button type="button">Add data</button></Empty.Actions>
    </Empty.Root>
  </Chart.Root>
</Story>

<Story name="Grid (responsive)">
  <Grid xs={1} sm={2} lg={4} gap={12}>
    {#each Array(8) as _, i}
      <div style="padding: 24px; border: 1px dashed currentColor; border-radius: 8px; text-align: center">{i + 1}</div>
    {/each}
  </Grid>
</Story>

<Story name="Meter">
  <div style="display: flex; flex-direction: column; gap: 20px; max-width: 360px">
    <Meter.Root value={0.72}>
      <Meter.Header><Meter.Title>Storage</Meter.Title><Meter.Tip>72 of 100 GB</Meter.Tip></Meter.Header>
      <Meter.Track />
    </Meter.Root>
    <Meter.Root value={0.58} variant="blocks" color="var(--chart-color-2)">
      <Meter.Header><Meter.Title>Documents</Meter.Title><Meter.Tip>of 40</Meter.Tip></Meter.Header>
      <Meter.Track />
      <Meter.Footer>Resets on the 1st</Meter.Footer>
    </Meter.Root>
    <Meter.Root value={0.3} size="sm" color="var(--chart-positive)">
      <Meter.Header><Meter.Title>Small</Meter.Title></Meter.Header>
      <Meter.Track />
    </Meter.Root>
  </div>
</Story>

<Story name="Percentage bar + legend scope">
  <Chart.LegendScope>
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 480px">
      <PercentageBar {items} />
      <Chart.Legend />
    </div>
  </Chart.LegendScope>
</Story>

<Story name="Tracker">
  <Tracker.Root style="max-width: 420px">
    <Tracker.Label label="Delivered" color="var(--chart-positive)" />
    <Tracker.Entry title="Shipment 1" when="Mon 14:20" description="Arrived at the pickup point" color="var(--chart-positive)">
      <Tracker.Steps>
        <Tracker.Step label="Label generated" state="done" />
        <Tracker.Step label="Delivered" state="done" />
      </Tracker.Steps>
    </Tracker.Entry>
    <Tracker.Label label="In progress" />
    <Tracker.Entry title="Shipment 2" when="Today">
      <Tracker.Steps>
        <Tracker.Step label="Label generated" state="done" />
        <Tracker.Step label="Packing" state="active" />
        <Tracker.Step label="Handover to carrier" />
      </Tracker.Steps>
    </Tracker.Entry>
  </Tracker.Root>
</Story>
