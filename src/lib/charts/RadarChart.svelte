<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { RadarChart as EcRadarChart } from 'echarts/charts';
  import { RadarComponent } from 'echarts/components';
  echarts.use([EcRadarChart, RadarComponent]);
</script>

<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge } from '../theme.js';
  import type { CanvasProps } from './types.js';

  type Props = CanvasProps & {
    indicators: { name: string; max?: number }[];
    series: { name: string; values: number[]; color?: string }[];
    /** Fill the polygons. */
    area?: boolean;
  };

  let { ref = $bindable(null), indicators, series, area = true, option = {}, ...rest }: Props = $props();

  const built = $derived((t: import('../theme.js').ResolvedTheme) =>
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        radar: {
          indicator: indicators,
          radius: '68%',
          axisName: { color: t.muted, fontFamily: t.fontFamily, fontSize: t.fontSize },
          axisLine: { lineStyle: { color: t.grid } },
          splitLine: { lineStyle: { color: t.grid } },
          splitArea: { show: false }
        },
        series: [
          {
            type: 'radar',
            symbol: 'circle',
            symbolSize: 5,
            data: series.map((s) => ({
              name: s.name,
              value: s.values,
              lineStyle: { width: 2, ...(s.color ? { color: s.color } : {}) },
              ...(s.color ? { itemStyle: { color: s.color } } : {}),
              ...(area ? { areaStyle: { opacity: 0.12, ...(s.color ? { color: s.color } : {}) } } : {})
            }))
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
