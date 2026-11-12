<script lang="ts">
  import type { PartProps } from '../../types.js';
  import { getMeterContext } from './context.svelte.js';

  let { ref = $bindable(null), ...rest }: Omit<PartProps<HTMLDivElement>, 'children' | 'child'> = $props();
  const ctx = getMeterContext();
  const value = $derived(ctx?.value ?? 0);
  const filled = $derived(Math.round(value * (ctx?.blocks ?? 10)));
</script>

<div
  bind:this={ref}
  data-meter-track=""
  role="meter"
  aria-valuemin={0}
  aria-valuemax={1}
  aria-valuenow={value}
  aria-valuetext="{Math.round(value * 100)}%"
  aria-labelledby={ctx?.hasTitle ? ctx.titleId : undefined}
  style:--meter-fill={value}
  {...rest}
>
  {#if ctx?.variant === 'blocks'}
    {#each { length: ctx.blocks } as _, i}
      <span data-meter-block="" data-filled={i < filled ? '' : undefined}></span>
    {/each}
  {:else}
    <span data-meter-fill=""></span>
  {/if}
</div>
