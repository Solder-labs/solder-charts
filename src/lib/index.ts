import ChartRoot from './components/chart/chart-root.svelte';
import ChartHeader from './components/chart/chart-header.svelte';
import ChartTitle from './components/chart/chart-title.svelte';
import ChartDescription from './components/chart/chart-description.svelte';
import ChartCanvas from './components/chart/chart-canvas.svelte';
import ChartLegend from './components/chart/chart-legend.svelte';

import ChartLegendScope from './components/chart/chart-legend-scope.svelte';
import TrackerCardRoot from './components/tracker-card/tracker-card-root.svelte';
import TrackerCardHeader from './components/tracker-card/tracker-card-header.svelte';
import TrackerCardTitle from './components/tracker-card/tracker-card-title.svelte';
import TrackerCardSubtitle from './components/tracker-card/tracker-card-subtitle.svelte';
import TrackerCardIcon from './components/tracker-card/tracker-card-icon.svelte';
import TrackerCardSegments from './components/tracker-card/tracker-card-segments.svelte';
import TrackerCardSegment from './components/tracker-card/tracker-card-segment.svelte';

import Change from './components/change/change.svelte';
import StatHeader from './components/stat/stat-header.svelte';
import StatIcon from './components/stat/stat-icon.svelte';
import StatFooter from './components/stat/stat-footer.svelte';
import ComparisonRoot from './components/comparison/comparison-root.svelte';
import ComparisonTitle from './components/comparison/comparison-title.svelte';
import ComparisonValues from './components/comparison/comparison-values.svelte';
import ComparisonItem from './components/comparison/comparison-item.svelte';
import ComparisonDelta from './components/comparison/comparison-delta.svelte';
import ComparisonFooter from './components/comparison/comparison-footer.svelte';
import DetailsTableRoot from './components/details-table/details-table-root.svelte';
import DetailsTableTitle from './components/details-table/details-table-title.svelte';
import DetailsTableList from './components/details-table/details-table-list.svelte';
import DetailsTableRow from './components/details-table/details-table-row.svelte';
import EmptyRoot from './components/empty/empty-root.svelte';
import EmptyIcon from './components/empty/empty-icon.svelte';
import EmptyTitle from './components/empty/empty-title.svelte';
import EmptyDescription from './components/empty/empty-description.svelte';
import EmptyActions from './components/empty/empty-actions.svelte';
import MeterRoot from './components/meter/meter-root.svelte';
import MeterHeader from './components/meter/meter-header.svelte';
import MeterTitle from './components/meter/meter-title.svelte';
import MeterTip from './components/meter/meter-tip.svelte';
import MeterTrack from './components/meter/meter-track.svelte';
import MeterFooter from './components/meter/meter-footer.svelte';
import TrackerRoot from './components/tracker/tracker-root.svelte';
import TrackerLabel from './components/tracker/tracker-label.svelte';
import TrackerEntry from './components/tracker/tracker-entry.svelte';
import TrackerSteps from './components/tracker/tracker-steps.svelte';
import TrackerStep from './components/tracker/tracker-step.svelte';

import StatRoot from './components/stat/stat-root.svelte';
import StatLabel from './components/stat/stat-label.svelte';
import StatValue from './components/stat/stat-value.svelte';
import StatDelta from './components/stat/stat-delta.svelte';
import StatChart from './components/stat/stat-chart.svelte';

/** Compound chart parts: `<Chart.Root><Chart.Title/><Chart.Canvas {option}/></Chart.Root>` */
export const Chart = {
  Root: ChartRoot,
  Header: ChartHeader,
  Title: ChartTitle,
  Description: ChartDescription,
  Canvas: ChartCanvas,
  Legend: ChartLegend,
  /** Renderless: shares hover/toggle state between a chart and a legend that live outside a `Chart.Root`. */
  LegendScope: ChartLegendScope
};

/** `<TrackerCard.Root><TrackerCard.Header>…</TrackerCard.Header><TrackerCard.Segments><TrackerCard.Segment label state/></TrackerCard.Segments></TrackerCard.Root>` */
export const TrackerCard = {
  Root: TrackerCardRoot,
  Header: TrackerCardHeader,
  Title: TrackerCardTitle,
  Subtitle: TrackerCardSubtitle,
  Icon: TrackerCardIcon,
  Segments: TrackerCardSegments,
  Segment: TrackerCardSegment
};

/** Compound KPI parts: `<Stat.Root><Stat.Label/><Stat.Value/><Stat.Delta/></Stat.Root>` */
export const Stat = {
  Root: StatRoot,
  Label: StatLabel,
  Value: StatValue,
  Delta: StatDelta,
  Chart: StatChart,
  Header: StatHeader,
  Icon: StatIcon,
  Footer: StatFooter
};

/** Two-period comparison: `<Comparison.Root {current} {previous}>…<Comparison.Delta/></Comparison.Root>` */
export const Comparison = {
  Root: ComparisonRoot,
  Title: ComparisonTitle,
  Values: ComparisonValues,
  Item: ComparisonItem,
  Delta: ComparisonDelta,
  Footer: ComparisonFooter
};

/** Label/value list: `<DetailsTable.Root><Title/><List><Row label value/></List></Root>` */
export const DetailsTable = {
  Root: DetailsTableRoot,
  Title: DetailsTableTitle,
  List: DetailsTableList,
  Row: DetailsTableRow
};

/** Placeholder for panes without data. */
export const Empty = {
  Root: EmptyRoot,
  Icon: EmptyIcon,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Actions: EmptyActions
};

/** Progress meter (`bar` or `blocks`): value 0–1. */
export const Meter = {
  Root: MeterRoot,
  Header: MeterHeader,
  Title: MeterTitle,
  Tip: MeterTip,
  Track: MeterTrack,
  Footer: MeterFooter
};

/** Vertical timeline: Label (phase), Entry (milestone) and nested Steps. */
export const Tracker = {
  Root: TrackerRoot,
  Label: TrackerLabel,
  Entry: TrackerEntry,
  Steps: TrackerSteps,
  Step: TrackerStep
};

export { Change };
export { default as Grid } from './components/grid/grid.svelte';
export { default as PercentageBar } from './components/percentage-bar/percentage-bar.svelte';
export type { PercentageBarItem } from './components/percentage-bar/percentage-bar.svelte';

export { default as LineChart } from './charts/LineChart.svelte';
export { default as AreaChart } from './charts/AreaChart.svelte';
export { default as BarChart } from './charts/BarChart.svelte';
export { default as DonutChart } from './charts/DonutChart.svelte';
export { default as Sparkline } from './charts/Sparkline.svelte';
export { default as PieChart } from './charts/PieChart.svelte';
export { default as MixedChart } from './charts/MixedChart.svelte';
export { default as ScatterChart } from './charts/ScatterChart.svelte';
export { default as BubbleChart } from './charts/BubbleChart.svelte';
export { default as RadarChart } from './charts/RadarChart.svelte';
export { default as RadialBarChart } from './charts/RadialBarChart.svelte';
export { default as PolarAreaChart } from './charts/PolarAreaChart.svelte';
export { default as HeatmapChart } from './charts/HeatmapChart.svelte';
export { default as BoxPlotChart } from './charts/BoxPlotChart.svelte';
export { default as CandlestickChart } from './charts/CandlestickChart.svelte';
export { default as TreemapChart } from './charts/TreemapChart.svelte';
export type { TreemapNode } from './charts/TreemapChart.svelte';

export { echarts } from './echarts.js';
export { baseOption, resolveTheme, deepMerge } from './theme.js';
export type { ResolvedTheme } from './theme.js';
export type { EChartsInstance, EChartsOption } from './echarts.js';
export type { SeriesDef, Row } from './charts/cartesian.js';
export type { PartProps } from './types.js';
export type { LegendItem } from './components/chart/context.svelte.js';
