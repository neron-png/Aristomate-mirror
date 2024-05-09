<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { firstBootStore } from './BootStore';
  import { arrowForward, arrowBack, close } from 'ionicons/icons';

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
  <button on:click={() => (showGuide = false)}>
    <ion-icon icon={close} />
  </button>
  <div class="carousel">
    {#each slides as slide, index (slide.id)}
      <div class="slide" id={'slide' + slide.id} class:selected={index === currentSlide}>
        {slide.content}
      </div>
    {/each}
  </div>
  <div class="controls">
    <button on:click={() => changeSlide('prev')}>
      <ion-icon id="arrow-icon-back" icon={arrowBack} />
    </button>
    <div class="dots">
      {#each slides as slide, index (slide.id)}
        <div
          class="dot"
          class:selected={index === currentSlide}
          on:click={() => (currentSlide = index)}
        ></div>
      {/each}
    </div>
    <button on:click={() => changeSlide('next')}>
      <ion-icon id="arrow-icon-forward" icon={arrowForward} />
    </button>
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
    border-radius: 15px;
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
    transition: opacity 0.5s ease;
    display: none;
  }

  .slide.selected {
    display: block;
    opacity: 1;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .dots {
    display: flex;
    align-items: center; /* Align dots vertically centered with arrows */
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 0 5px;
    background-color: var(--ion-color-medium); /* Inactive dot color */
    cursor: pointer;
  }

  .dot.selected {
    background-color: var(--ion-color-primary); /* Active dot color */
  }

  #arrow-icon-back {
    order: 1;
  }

  #arrow-icon-forward {
    order: 3; /* Adjust order to place forward arrow at the end */
  }

  button:hover {
    background-color: var(--ion-color-primary);
  }
</style>
