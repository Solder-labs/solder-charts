<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = PartProps<HTMLDivElement> & {
    /** Where segment labels render relative to their bars. */
    labels?: 'top' | 'bottom';
    /** Any CSS colour (or `var(--…)`). Tints the icon and the default segment colour. */
    color?: string;
  };

  let { ref = $bindable(null), labels = 'bottom', color, style, children, child, ...rest }: Props = $props();

  const merged = $derived({
    'data-tracker-card-root': '',
    'data-labels': labels,
    style: [color ? `--tracker-color: ${color}` : '', style].filter(Boolean).join(';') || undefined,
    ...rest
  });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>{@render children?.()}</div>
{/if}
