<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { setMeterContext, type MeterContext } from './context.svelte.js';

  type Props = PartProps<HTMLDivElement> & {
    /** Progress from 0 to 1. */
    value: number;
    variant?: 'bar' | 'blocks';
    /** Number of blocks for the `blocks` variant. */
    blocks?: number;
    /** Any CSS colour. */
    color?: string;
    size?: 'sm' | 'md';
  };

  let { ref = $bindable(null), value, variant = 'bar', blocks = 10, color, size = 'md', style, children, child, ...rest }: Props = $props();

  const uid = $props.id();
  let hasTitle = $state(false);
  const ctx: MeterContext = {
    get value() { return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0)); },
    get variant() { return variant; },
    get blocks() { return blocks; },
    get hasTitle() { return hasTitle; },
    set hasTitle(v: boolean) { hasTitle = v; },
    titleId: `${uid}-title`
  };
  setMeterContext(ctx);

  const merged = $derived({
    'data-meter-root': '',
    'data-variant': variant,
    'data-size': size,
    style: [color ? `--meter-color: ${color}` : '', style].filter(Boolean).join(';') || undefined,
    ...rest
  });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
