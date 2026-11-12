<script lang="ts">
  import type { Snippet } from 'svelte';
  import { createChartContext } from './context.svelte.js';

  /**
   * Renderless. Shares one chart/legend context with its children so a `Chart.Canvas` (or any preset)
   * and a `Chart.Legend` stay in sync (hover highlight, series toggling) without being inside a `Chart.Root`.
   */
  let { children }: { children?: Snippet } = $props();

  const uid = $props.id();
  createChartContext(uid);
</script>

{@render children?.()}
