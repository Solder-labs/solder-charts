<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ChartRoot from '$lib/components/chart/chart-root.svelte';
  import { Chart, LineChart, AreaChart, BarChart, DonutChart } from '$lib/index.js';
  import { monthly, series, traffic } from './data.js';

  const { Story } = defineMeta({
    title: 'Charts/Pane',
    component: ChartRoot
  });
</script>

<Story name="Line">
  <Chart.Root style="max-width: 640px">
    <Chart.Header>
      <Chart.Title>Revenue vs costs</Chart.Title>
      <Chart.Description>Monthly, in thousands</Chart.Description>
    </Chart.Header>
    <LineChart data={monthly} x="month" {series} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Area (stacked)">
  <Chart.Root style="max-width: 640px">
    <Chart.Header><Chart.Title>Stacked area</Chart.Title></Chart.Header>
    <AreaChart data={monthly} x="month" {series} stacked />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Bar">
  <Chart.Root style="max-width: 640px">
    <Chart.Header><Chart.Title>Bars</Chart.Title></Chart.Header>
    <BarChart data={monthly} x="month" {series} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Donut">
  <Chart.Root style="max-width: 360px">
    <Chart.Header>
      <Chart.Title>Traffic sources</Chart.Title>
      <Chart.Description>Last 30 days</Chart.Description>
    </Chart.Header>
    <DonutChart data={traffic} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Custom option escape hatch">
  <Chart.Root style="max-width: 640px">
    <Chart.Title>Raw ECharts option merged on top</Chart.Title>
    <LineChart
      data={monthly}
      x="month"
      {series}
      option={{ yAxis: { name: 'k€' }, series: [{ smooth: false }, { lineStyle: { type: 'dashed' } }] }}
    />
  </Chart.Root>
</Story>

<Story name="Legend scope (chart + legend side by side)">
  <Chart.LegendScope>
    <div style="display: flex; align-items: center; gap: 24px; max-width: 520px">
      <div style="flex: 0 0 180px; height: 180px">
        <DonutChart data={traffic} style="height: 100%" />
      </div>
      <Chart.Legend style="flex-direction: column" />
    </div>
  </Chart.LegendScope>
</Story>
