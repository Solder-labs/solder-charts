<script lang="ts">
  import type { PartProps } from '../../types.js';

  type Props = PartProps<HTMLDivElement> & { label: string; value?: string | number };
  let { ref = $bindable(null), label, value, children, child, ...rest }: Props = $props();
  const merged = $derived({ 'data-details-table-row': '', ...rest });
</script>

{#if child}
  {@render child({ props: merged })}
{:else}
  <div bind:this={ref} {...merged}>
    <dt data-details-table-label="">{label}</dt>
    <dd data-details-table-value="">{#if children}{@render children()}{:else}{value}{/if}</dd>
  </div>
{/if}
