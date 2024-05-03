<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { firstBootStore } from './BootStore';

  let showGuide = false;
  let currentSlide = 0;

  const slides = [
    { id: 1, content: 'Slide 1 Content' },
    { id: 2, content: 'Slide 2 Content' },
    { id: 3, content: 'Slide 3 Content' }
  ];

  function changeSlide(direction) {
    if (direction === 'next') {
      currentSlide = (currentSlide + 1) % slides.length;
    } else if (direction === 'prev') {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
  }

  onMount(() => {
    const alreadyVisited = get(firstBootStore);

    if (alreadyVisited.firstBoot === true) {
      showGuide = true;
      firstBootStore.set(false);
    }
  });
</script>

{#if showGuide}
<div class="guide">
  <div class="carousel">
    {#each slides as slide, index (slide.id)}
      <div class="slide" id={'slide' + slide.id} class:selected={index === currentSlide}>
        {slide.content}
      </div>
    {/each}
  </div>
  <div class="controls">
    <button on:click={() => changeSlide('prev')}>Previous</button>
    <button on:click={() => changeSlide('next')}>Next</button>
    <button on:click={() => (showGuide = false)}>Close</button>
  </div>
</div>
{/if}

<style>
  .guide {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: var(--ion-color-primary-contrast);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .carousel {
    display: flex;
    overflow-x: hidden;
    width: 100%;
    position: relative;
    transition: transform 0.3s ease;
  }

  .slide {
    min-width: 100%;
    padding: 20px;
    box-sizing: border-box;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    display: none;
  }

  .slide.selected {
    display: block;
    opacity: 1;
  }

  .controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  button {
    margin: 0 10px;
    padding: 8px 16px;
    cursor: pointer;
    background-color: var(--ion-color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    outline: none;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--ion-color-primary);
  }
</style>
