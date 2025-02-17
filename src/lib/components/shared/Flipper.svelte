<script lang="ts">
    export let flipped: boolean;    
    export let reactToHeight: boolean = false;
    
    // The flip class is what we use to toggle the flip effect.
    let flipClass = false;
    $ : flipClass = flipped;

    // We need to keep track of the flip container and the front
    // and back children so we can update the height of the flip card.
    let flipContainer: HTMLElement;
    let frontChild: HTMLElement;
    let backChild: HTMLElement;

    // This function updates the height of the flip card when it's toggled.
    const updateHeight = (status: Boolean) => {
        // Important, this code will run once before the flip container is defined, so we need to check it exists.
        if (flipContainer && frontChild && backChild) {
            // The height relative to the rest of the page is dictated by the main container, so we 
            // set it's height to the height of the front or back child, depending on the status of the flip.
            // So if we're flipped, use the back child, otherwise the front
            flipContainer.style.height = status ? `${backChild.clientHeight}px` : `${frontChild.clientHeight}px`;
        }
    }

    // When the flip class changes, update the height of the flip card.
    // Check if we should update the height of the flip card when it's toggled.
    // Sometimes we don't want to do this, that's why it's optional.
    $: if (reactToHeight) updateHeight(flipClass);

</script>

<!-- Main container, this dictates the element height and flip state/click handling -->
<!-- <div on:click={() => flipClass = !flipClass} class="flip-container" class:flipClass={flipClass} aria-hidden bind:this={flipContainer}> -->
<div class="flip-container" class:flipClass={flipClass} aria-hidden bind:this={flipContainer}>
    <!-- The flipper is the element that rotates, it contains the front and back children and handles the animation -->
    <div class="flipper">
        <!-- Slot for the front element and wrapping div -->
        <div class="front" bind:this={frontChild}>
            <slot name="front"/>
        </div>
        <!-- Slot for the back element and wrapping div -->
        <div class="back" bind:this={backChild}>
            <slot name="back"/>
        </div>
    </div>
</div>

<style>

.flip-container, .flipper, .front, .back {
    will-change: transform;
    transform: translateZ(0);
}

/*  */
.flip-container {
  -webkit-perspective: 1000px;
  -moz-perspective: 1000px;
  -o-perspective: 1000px;
  perspective: 1000px;
  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -o-transition: 0.2s;
  -ms-transition: 0.2s;
}

/* When flipClass is active, rotate the whole contents of flipper 180 */
.flip-container.flipClass
.flipper {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  transform: rotateY(-180deg);
}


/* Animation for the rotation and style */
.flipper {
  transition: 0.6s;
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  -ms-transition: 0.6s;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  position: relative;
}

/* hide back of pane during swap */
.front,
.back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}



/* front pane, placed above back */
.front {
    z-index: 2;
    /* for firefox 31 */
    position: relative;
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
}

/* back, initially hidden pane, moved to the same position as the front pane */
.back {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
}
</style>