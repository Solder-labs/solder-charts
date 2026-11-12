<script module lang="ts">
  import { echarts } from '../echarts.js';
  import { TreemapChart as EcTreemapChart } from 'echarts/charts';
  echarts.use([EcTreemapChart]);
</script>

<script lang="ts">
  import ChartCanvas from '../components/chart/chart-canvas.svelte';
  import { deepMerge, type ResolvedTheme } from '../theme.js';
  import type { CanvasProps } from './types.js';

  export interface TreemapNode {
    name: string;
    value?: number;
    color?: string;
    children?: TreemapNode[];
  }

  type Props = CanvasProps & { data: TreemapNode[] };

  let { ref = $bindable(null), data, option = {}, ...rest }: Props = $props();

  const mapNode = (n: TreemapNode): Record<string, unknown> => ({
    name: n.name,
    value: n.value,
    ...(n.color ? { itemStyle: { color: n.color } } : {}),
    ...(n.children ? { children: n.children.map(mapNode) } : {})
  });

  const built = $derived((t: ResolvedTheme) =>
    deepMerge(
      {
        tooltip: { trigger: 'item' },
        series: [
          {
            type: 'treemap',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            label: { show: true, formatter: '{b}', color: '#fff', fontFamily: t.fontFamily, fontSize: t.fontSize },
            itemStyle: { borderColor: t.surface, borderWidth: 2, gapWidth: 2, borderRadius: 6 },
            data: data.map(mapNode)
          }
        ]
      },
      option
    )
  );
</script>

<ChartCanvas bind:ref option={built} {...rest} />
