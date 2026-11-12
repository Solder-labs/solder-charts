<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = PartProps<HTMLDivElement> & {
    /** Gap in pixels. */
    gap?: number;
    /** Columns per breakpoint (min-width 0 / 640 / 768 / 1024 / 1280px). Unset values inherit from the smaller one. */
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  let { ref = $bindable(null), gap, xs = 1, sm, md, lg, xl, style, children, child, ...rest }: Props = $props();

  const cols = $derived.by(() => {
    const s = sm ?? xs;
    const m = md ?? s;
    const l = lg ?? m;
    return { xs, sm: s, md: m, lg: l, xl: xl ?? l };
  });

  const merged = $derived({
    'data-grid': '',
    style:
      [
        `--grid-cols-xs: ${cols.xs}`,
        `--grid-cols-sm: ${cols.sm}`,
        `--grid-cols-md: ${cols.md}`,
        `--grid-cols-lg: ${cols.lg}`,
        `--grid-cols-xl: ${cols.xl}`,
        gap !== undefined ? `--grid-gap: ${gap}px` : '',
        style
      ]
        .filter(Boolean)
        .join(';'),
    ...rest
  });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
