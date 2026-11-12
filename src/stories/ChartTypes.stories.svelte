<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Chart,
    PieChart,
    PolarAreaChart,
    RadarChart,
    RadialBarChart,
    ScatterChart,
    BubbleChart,
    HeatmapChart,
    BoxPlotChart,
    CandlestickChart,
    TreemapChart,
    MixedChart
  } from '$lib/index.js';
  import { monthly, traffic } from './data.js';

  const { Story } = defineMeta({ title: 'Charts/More types' });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['00', '04', '08', '12', '16', '20'];
  const heat: [number, number, number][] = hours.flatMap((_, y) =>
    days.map((_, x) => [x, y, Math.round(10 + 40 * Math.abs(Math.sin(x * 1.3 + y * 0.9)) + (y > 1 && y < 5 ? 30 : 0))] as [number, number, number])
  );
  const wide = 'max-width: 640px';
</script>

<Story name="Mixed (bars + line on 2 axes)">
  <Chart.Root style={wide}>
    <Chart.Title>Revenue and margin</Chart.Title>
    <MixedChart
      data={monthly.map((m) => ({ ...m, margin: Math.round(((m.revenue - m.costs) / m.revenue) * 100) }))}
      x="month"
      series={[
        { key: 'revenue', label: 'Revenue', type: 'bar' },
        { key: 'margin', label: 'Margin %', type: 'line', axis: 'right' }
      ]}
    />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Pie">
  <Chart.Root style="max-width: 360px">
    <Chart.Title>Traffic</Chart.Title>
    <PieChart data={traffic} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Polar area">
  <Chart.Root style="max-width: 360px">
    <Chart.Title>Traffic (polar area)</Chart.Title>
    <PolarAreaChart data={traffic} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Radar">
  <Chart.Root style="max-width: 420px">
    <Chart.Title>Team skills</Chart.Title>
    <RadarChart
      indicators={[{ name: 'Design', max: 10 }, { name: 'Speed', max: 10 }, { name: 'Quality', max: 10 }, { name: 'Comms', max: 10 }, { name: 'Ops', max: 10 }]}
      series={[
        { name: 'Team A', values: [8, 6, 7, 9, 5] },
        { name: 'Team B', values: [5, 9, 6, 6, 8] }
      ]}
    />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Radial bar">
  <Chart.Root style="max-width: 360px">
    <Chart.Title>Goals</Chart.Title>
    <RadialBarChart data={[{ name: 'Sales', value: 82 }, { name: 'Support', value: 64 }, { name: 'Retention', value: 47 }]} />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Scatter">
  <Chart.Root style={wide}>
    <Chart.Title>Height vs weight</Chart.Title>
    <ScatterChart
      series={[
        { name: 'Group A', data: Array.from({ length: 30 }, (_, i) => [150 + i * 1.2 + Math.sin(i) * 4, 50 + i * 0.9 + Math.cos(i * 2) * 5]) },
        { name: 'Group B', data: Array.from({ length: 30 }, (_, i) => [155 + i * 1.1 + Math.cos(i) * 4, 70 - i * 0.3 + Math.sin(i * 2) * 5]) }
      ]}
    />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Bubble">
  <Chart.Root style={wide}>
    <Chart.Title>Markets: growth vs margin, sized by revenue</Chart.Title>
    <BubbleChart
      series={[
        { name: 'EU', data: [[10, 20, 400], [24, 35, 900], [38, 18, 250]] },
        { name: 'US', data: [[15, 40, 1200], [30, 28, 600], [45, 50, 300]] }
      ]}
    />
    <Chart.Legend />
  </Chart.Root>
</Story>

<Story name="Heatmap">
  <Chart.Root style={wide}>
    <Chart.Title>Activity by hour</Chart.Title>
    <HeatmapChart x={days} y={hours} data={heat} name="Events" />
  </Chart.Root>
</Story>

<Story name="Box plot">
  <Chart.Root style={wide}>
    <Chart.Title>Response time (ms)</Chart.Title>
    <BoxPlotChart
      categories={['API', 'Web', 'Search', 'Auth']}
      data={[[80, 120, 160, 210, 300], [120, 180, 240, 330, 420], [40, 70, 95, 140, 200], [30, 50, 65, 90, 130]]}
    />
  </Chart.Root>
</Story>

<Story name="Candlestick">
  <Chart.Root style={wide}>
    <Chart.Title>Share price</Chart.Title>
    <CandlestickChart
      x={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue', 'Wed']}
      data={[[20, 34, 10, 38], [34, 30, 28, 40], [30, 38, 25, 42], [38, 32, 30, 45], [32, 40, 31, 44], [40, 36, 33, 47], [36, 29, 27, 39], [29, 41, 26, 43]]}
    />
  </Chart.Root>
</Story>

<Story name="Treemap">
  <Chart.Root style={wide}>
    <Chart.Title>Storage by team</Chart.Title>
    <TreemapChart
      data={[
        { name: 'Design', children: [{ name: 'Assets', value: 40 }, { name: 'Prototypes', value: 25 }] },
        { name: 'Engineering', children: [{ name: 'Repos', value: 70 }, { name: 'Builds', value: 30 }] },
        { name: 'Marketing', value: 35 }
      ]}
    />
  </Chart.Root>
</Story>
