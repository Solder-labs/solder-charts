# solder-charts

Svelte 5 components around [Apache ECharts](https://echarts.apache.org), with a
[bits-ui](https://bits-ui.com)-style API: small compound parts, `class` / `ref` / `child` on everything,
`data-*` attribute hooks, and a default theme you can ignore or override completely.
Default look is inspired by [Flux UI statistics](https://flux-ui.dev/statistics/).

**Storybook:** https://solder-labs.github.io/solder-charts/

## Install

```sh
pnpm add @solder-labs/charts echarts
```

```ts
import '@solder-labs/charts/styles.css'; // optional default theme
```

## Usage

```svelte
<script>
  import { Chart, LineChart, Stat, Sparkline } from '@solder-labs/charts';
</script>

<Chart.Root class="rounded-xl border p-4">
  <Chart.Header>
    <Chart.Title>Revenue</Chart.Title>
    <Chart.Description>Monthly, in thousands</Chart.Description>
  </Chart.Header>
  <LineChart data={rows} x="month" series={[{ key: 'revenue', label: 'Revenue' }]} />
  <Chart.Legend />
</Chart.Root>

<Stat.Root>
  <Stat.Label>Churn</Stat.Label>
  <Stat.Value>2.1%</Stat.Value>
  <Stat.Delta value={-0.4} invert />
  <Stat.Chart><Sparkline data={[3, 4, 3, 5, 6]} /></Stat.Chart>
</Stat.Root>
```

Presets: `LineChart`, `AreaChart`, `BarChart`, `DonutChart`, `Sparkline`. For anything else use
`<Chart.Canvas option={...} />` with a raw ECharts option. Presets accept `option` which is deep-merged on top.

## Styling

- Colours, grid, tooltip, radius, font are CSS variables (`--chart-color-1…8`, `--chart-text`, `--chart-grid`, …) —
  see `src/lib/styles.css`. Charts re-theme live when `data-theme`/`.dark` or the OS scheme changes.
- `Chart.LegendScope` (renderless) syncs hover/toggle between a chart and a legend outside a `Chart.Root`.
- `TrackerCard.*` parts: a step-progress card (`Root`, `Header`, `Title`, `Subtitle`, `Icon`, `Segments`, `Segment`).
- Parts expose `data-chart-root`, `data-chart-title`, `data-stat-value`, `data-trend`, `data-sentiment`, …
- Default styles use `:where()` (zero specificity), so Tailwind / your CSS always wins.
- `child` snippet renders your own element: `<Chart.Title>{#snippet child({ props })}<h2 {...props}>…</h2>{/snippet}</Chart.Title>`

## Development

```sh
pnpm install
pnpm dev               # Storybook
pnpm check && pnpm build
```

CI (`.github/workflows`): `ci.yml` type-checks/builds on PRs; `storybook.yml` deploys Storybook to GitHub Pages on
push to `main` (enable Pages → Source "GitHub Actions"); `release.yml` publishes to npm on a GitHub release
(needs `NPM_TOKEN`, a token with publish rights to the `@solder-labs` npm org).
