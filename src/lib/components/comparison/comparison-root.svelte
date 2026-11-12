<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { setComparisonContext } from './context.svelte.js';

  type Props = PartProps<HTMLDivElement> & {
    current: number;
    previous: number;
    /** Formats both values. Defaults to `toLocaleString`. */
    format?: (value: number) => string;
  };

  let { ref = $bindable(null), current, previous, format, children, child, ...rest }: Props = $props();

  setComparisonContext({
    get current() { return current; },
    get previous() { return previous; },
    get format() { return format ?? ((v: number) => v.toLocaleString()); },
    get delta() { return previous === 0 ? null : ((current - previous) / Math.abs(previous)) * 100; }
  });

  const merged = $derived({ 'data-comparison-root': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
