<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { firstBootStore } from './BootStore';
  import { arrowForward, arrowBack, close } from 'ionicons/icons';

  let showGuide = false;
  let currentSlide = 0;

  const slides = [
    { id: 1,title: "Καλώς όρισες στο Aristomate ", content: 'Υπάρχουν πολλές λειτουργίες που πρέπει να ανακαλύψεις!' },
    { id: 2,title: "Πορτοφόλι", content: 'Τώρα μπορείς να αποθηκεύσεις το ακαδημαικό σου πάσο στην εφαρμογή' },
    { id: 3,title: "Menu λέσχης", content: 'Μπορείς να μάθεις τι έχει για σήμερα η λέσχη του ΑΠΘ' },
    { id: 4,title: "Χάρτες", content: 'Δεν χρειάζεται πλέον να ψάχνεσαι, έχεις στην διάθεση σου κάθε τοποθεσία του ΑΠΘ εδω!'}
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
<div class="blur-effect-overlay"></div>

<div class="guide">
 <div class="main-content">
	  <button class="close-button" on:click={() => (showGuide = false)}>
	    <ion-icon icon={close} />
	  </button>

	  <div class="carousel">
	    {#each slides as slide, index (slide.id)}
	      <div class="slide" id={'slide' + slide.id} class:selected={index === currentSlide}>
		<h3 class="title-of-slide">{slide.title}</h3>
		<br>
		{slide.content}
	      </div>
	    {/each}
	  </div>
  </div>

  <button on:click={() => changeSlide('next')} id="next-slide-button">
	Δείξε μου!
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

</div>
{/if}

<style>
  .blur-effect-overlay{
    position: fixed; 
    top: 0; 
    bottom: 0; 
    width: 100%; 
    height: 100%; 
    background-color: rgba(0, 0, 0, 0,5); 
    backdrop-filter: blur(8px); 
    z-index: 999;
  }

  .guide {
    position: fixed;
    top: 20%;
    bottom: 20%;
    left: 5%; 
    right: 5%; 
/*    transform: translate(-50%, -50%); */
    padding: 5%;
    background-color: var(--ion-color-primary-contrast);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    z-index: 1000;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
  }

  .main-content{
    display: flex; 
    flex-direction: column; 
    align-self: stretch; 
    flex: 1; 
  }

  .carousel {
    display: flex;
    overflow-x: hidden;
    width: 100%;
    position: relative;
  }

  .close-button{
    align-self: flex-start; 
  }

  .title-of-slide{
    color: var(--ion-color-primary); 
    font-size: 4vh;
    font-weight: bold; 
  }

  .slide {
    align-self: flex-center; 
    min-width: 100%;
    text-align: center;
    padding: 5%;
    box-sizing: border-box;
    opacity: 0.8;
    display: none;
  }

  .slide.selected {
    display: block;
    opacity: 1;
  }

  #next-slide-button{
    background-color: var(--ion-color-primary); 
    border-radius: 4vw; 
    color: var(--ion-color-primary-contrast); 
    margin: 8vh; 
    padding: 2vh; 
    font-size: 2.5vh;
    font-weight: bold; 
  }

 .dots { 
    display: flex;
    justify-content: center; 
    align-items: flex-end; 
    margin-top: auto; 
  }

  .dot {
    width: 2.5vw;
    height: 2.5vw;
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
