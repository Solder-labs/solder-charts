<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { PartProps } from '../../types.js';

  type Props = Omit<PartProps<HTMLSpanElement>, 'children'> & {
    /** Text, or a number (formatted as a signed percentage, and used to derive `trend`). */
    value: string | number;
    trend?: 'up' | 'down' | 'flat';
    /** Whether the change is good news. Derived from `trend` for numbers when omitted. */
    sentiment?: 'positive' | 'negative' | 'neutral';
    /** Hide the trend arrow. */
    hideIcon?: boolean;
    /** Replace the default arrow icon. */
    icon?: Snippet<[{ trend: 'up' | 'down' | 'flat' }]>;
  };

  let { ref = $bindable(null), value, trend, sentiment, hideIcon = false, icon, child, ...rest }: Props = $props();

  const t = $derived(trend ?? (typeof value === 'number' ? (value > 0 ? 'up' : value < 0 ? 'down' : 'flat') : 'flat'));
  const s = $derived(sentiment ?? (t === 'up' ? 'positive' : t === 'down' ? 'negative' : 'neutral'));
  const text = $derived(
    typeof value === 'number'
      ? `${value > 0 ? '+' : value < 0 ? '−' : ''}${Math.abs(value).toLocaleString()}%`
      : value
  );
  const merged = $derived({ 'data-change': '', 'data-trend': t, 'data-sentiment': s, ...rest });
</script>

{#snippet arrow(dir: 'up' | 'down' | 'flat')}
  <svg data-change-icon="" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    {#if dir === 'up'}<path d="M2 8.5 5 5.5l2 2L10.5 3.5M7.5 3.5h3v3" />{:else if dir === 'down'}<path d="M2 3.5 5 6.5l2-2 3.5 4M7.5 8.5h3v-3" />{:else}<path d="M2.5 6h7M7 3.5 9.5 6 7 8.5" />{/if}
  </svg>
{/snippet}

{#if child}
  {@render child({ props: merged })}
{:else}
  <span bind:this={ref} {...merged}>
    {#if !hideIcon}{#if icon}{@render icon({ trend: t })}{:else}{@render arrow(t)}{/if}{/if}
    {text}
  </span>
{/if}
