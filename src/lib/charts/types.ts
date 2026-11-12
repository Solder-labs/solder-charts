import type { EChartsOption } from '../echarts.js';
import type { PartProps } from '../types.js';
import type { Row, SeriesDef } from './cartesian.js';

export type CanvasProps = Omit<PartProps<HTMLDivElement>, 'children' | 'child'> & {
  /** ECharts option merged on top of the generated one — escape hatch for anything. */
  option?: EChartsOption;
  renderer?: 'canvas' | 'svg';
};

export type CartesianChartProps = CanvasProps & {
  data: Row[];
  x: string;
  series: SeriesDef[];
  smooth?: boolean;
  stacked?: boolean;
};
