<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = Omit<PartProps<HTMLLIElement>, 'children' | 'child'> & { label: string; color?: string };
  let { ref = $bindable(null), label, color, style, ...rest }: Props = $props();
</script>

<li
  bind:this={ref}
  data-tracker-label=""
  style={[color ? `--tracker-color: ${color}` : '', style].filter(Boolean).join(';') || undefined}
  {...rest}
>
  <span>{label}</span>
</li>
