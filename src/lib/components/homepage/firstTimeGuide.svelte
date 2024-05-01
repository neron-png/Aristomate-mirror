<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { firstBootStore } from './BootStore';

  let showGuide = false;

  onMount(() => {
    const alreadyVisited = get(firstBootStore);

    if (alreadyVisited.firstBoot == true) {
      showGuide = true  // Controls alert

      firstBootStore.set(false);
    }
  });
</script>

<div class="guide">
 {#if showGuide == true}
    <h1>Hello there</h1>

 {/if}
</div>
