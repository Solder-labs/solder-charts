<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = Omit<PartProps<HTMLDivElement>, 'children' | 'child'> & {
    label: string;
    state?: 'done' | 'active' | 'todo';
    /** Fill progress of this segment: `(value - min) / (max - min)`. Defaults: done 100%, active 100%, todo 0%. */
    value?: number;
    min?: number;
    max?: number;
    /** Any CSS colour; overrides the card colour for this segment. */
    color?: string;
  };

  let {
    ref = $bindable(null),
    label,
    state = 'todo',
    value,
    min = 0,
    max = 1,
    color,
    style,
    ...rest
  }: Props = $props();

  const fill = $derived.by(() => {
    if (state === 'done') return 1;
    if (state === 'todo') return value === undefined ? 0 : clamp((value - min) / (max - min));
    return value === undefined ? 1 : clamp((value - min) / (max - min));
  });
  const clamp = (n: number) => (Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0);

  const merged = $derived({
    'data-tracker-card-segment': '',
    'data-state': state,
    role: 'listitem',
    'aria-current': state === 'active' ? ('step' as const) : undefined,
    style:
      [`--tracker-fill: ${fill}`, color ? `--tracker-color: ${color}` : '', style].filter(Boolean).join(';'),
    ...rest
  });
</script>

<div bind:this={ref} {...merged}>
  <span data-tracker-card-segment-label="">{label}<span data-sr-only=""> ({state})</span></span>
  <span data-tracker-card-segment-bar="" aria-hidden="true"><span data-tracker-card-segment-fill=""></span></span>
</div>
