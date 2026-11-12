<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import TrackerCardRoot from '$lib/components/tracker-card/tracker-card-root.svelte';
  import { TrackerCard } from '$lib/index.js';

  const { Story } = defineMeta({
    title: 'Statistics/Tracker card',
    component: TrackerCardRoot
  });
</script>

{#snippet truck()}
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
{/snippet}

<Story name="Order tracking">
  <TrackerCard.Root style="max-width: 480px" labels="bottom">
    <TrackerCard.Header>
      <div>
        <TrackerCard.Title>Your order is on the way</TrackerCard.Title>
        <TrackerCard.Subtitle>Step 2 of 4 · Packed</TrackerCard.Subtitle>
      </div>
      <TrackerCard.Icon>{@render truck()}</TrackerCard.Icon>
    </TrackerCard.Header>
    <TrackerCard.Segments>
      <TrackerCard.Segment label="Ordered" state="done" />
      <TrackerCard.Segment label="Packed" state="active" />
      <TrackerCard.Segment label="Shipped" />
      <TrackerCard.Segment label="Delivered" />
    </TrackerCard.Segments>
  </TrackerCard.Root>
</Story>

<Story name="Partial progress + colours">
  <TrackerCard.Root style="max-width: 480px" labels="top" color="var(--chart-warning, #f59e0b)">
    <TrackerCard.Header>
      <div>
        <TrackerCard.Title>Deployment</TrackerCard.Title>
        <TrackerCard.Subtitle>Waiting on approval</TrackerCard.Subtitle>
      </div>
      <TrackerCard.Icon>{@render truck()}</TrackerCard.Icon>
    </TrackerCard.Header>
    <TrackerCard.Segments>
      <TrackerCard.Segment label="Build" state="done" color="var(--chart-positive)" />
      <TrackerCard.Segment label="Test" state="done" color="var(--chart-positive)" />
      <TrackerCard.Segment label="Approve" state="active" value={0.4} />
      <TrackerCard.Segment label="Release" />
    </TrackerCard.Segments>
  </TrackerCard.Root>
</Story>
