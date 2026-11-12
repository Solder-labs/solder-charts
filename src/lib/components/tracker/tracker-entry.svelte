<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { PartProps } from '../../types.js';

  type Props = Omit<PartProps<HTMLLIElement>, 'child'> & {
    title: string;
    /** Timestamp or relative time, e.g. "2 hours ago". */
    when?: string;
    description?: string;
    color?: string;
    /** Content of the rail marker. Defaults to a dot. */
    icon?: Snippet;
    /** Content on the right of the entry header, e.g. a badge. */
    end?: Snippet;
  };

  let { ref = $bindable(null), title, when, description, color, icon, end, style, children, ...rest }: Props = $props();
</script>

<li
  bind:this={ref}
  data-tracker-entry=""
  style={[color ? `--tracker-color: ${color}` : '', style].filter(Boolean).join(';') || undefined}
  {...rest}
>
  <span data-tracker-marker="" aria-hidden="true">{@render icon?.()}</span>
  <div data-tracker-entry-body="">
    <div data-tracker-entry-header="">
      <div>
        <div data-tracker-entry-title="">{title}</div>
        {#if when}<div data-tracker-entry-when="">{when}</div>{/if}
      </div>
      {@render end?.()}
    </div>
    {#if description}<p data-tracker-entry-description="">{description}</p>{/if}
    {@render children?.()}
  </div>
</li>
