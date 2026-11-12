<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = Omit<PartProps<HTMLLIElement>, 'children' | 'child'> & {
    label: string;
    state?: 'done' | 'active' | 'pending';
  };
  let { ref = $bindable(null), label, state = 'pending', ...rest }: Props = $props();
</script>

<li bind:this={ref} data-tracker-step="" data-state={state} aria-current={state === 'active' ? 'step' : undefined} {...rest}>
  <span data-tracker-step-indicator="" aria-hidden="true"></span>
  <span>{label}<span data-sr-only=""> ({state})</span></span>
</li>
