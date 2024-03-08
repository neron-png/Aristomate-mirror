<script context="module" lang="ts">
	let onTop: null;   //keeping track of which open modal is on top

	let modal: { open: () => void; close: () => void; };
	
	// 	returns an object for the modal specified by `id`, which contains the API functions (`open` and `close` )
	export function getModal(){
		return modal;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<script lang="ts">
  import VectorGreece from "$lib/components/language/Greece.svg"
  import VectorUSA from "$lib/components/language/USA.svg"

  function flagClick(this: any)
  {
    console.log(this.id);
    close();
  }
    
  let topDiv: HTMLDivElement;
  let visible = false;
  let prevOnTop: any;

  /**  API **/
  function open(){
    if (visible) return;
    prevOnTop = onTop;
    onTop = topDiv;
    
    //this prevents scrolling of the main window on larger screens
    document.body.style.overflow="hidden";

    visible=true;
    //Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
    document.body.appendChild(topDiv);
  }
    
  function close(){
    onTop = prevOnTop;
    if (onTop == null) document.body.style.overflow = "";
    visible = false;
  }
    
  //expose the API
  modal = {open,close};

    
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="topModal" class:visible bind:this={topDiv} on:click={() => close()}>
	<div id='modal' on:click|stopPropagation={() => {}}>
		<svg id="close" on:click={() => close()} viewBox="0 0 12 12">
			<circle cx=6 cy=6 r=6 />
			<line x1=3 y1=3 x2=9 y2=9 />
			<line x1=9 y1=3 x2=3 y2=9 />
		</svg>
    
		<div id = "flags">
      <div class = "flag-container" id = "Greece" on:click={flagClick}>
        <img src={VectorGreece} alt="Greece">
        <p class = "flag-name">Ελληνικά</p>
      </div>
    
      <div class = "flag-container" id = "USA" on:click={flagClick}>
        <img src={VectorUSA} alt="USA">
        <p class = "flag-name">English (USA)</p>
      </div>
    
    </div>
	</div>
</div>


<style>
	#topModal {
		visibility: hidden;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #4448;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	#modal {
    margin-inline: 1.5em;
		position: relative;
		border-radius: 1rem;
		background: rgb(255, 255, 255);
		padding: 1em;
	}

	.visible {
		visibility: visible !important;
	}

	#close {
		position: absolute;
		top: -0.8rem;
		right: -0.8rem;
		width: 1.8rem;
		height: 1.8rem;
		cursor: pointer;
		fill:#F44;
		transition: transform 3s;
    filter: drop-shadow(0rem 0rem 1em rgba(255, 0, 0, 0.582))
	}

	#close line {
		stroke:#FFF;
		stroke-width: 0.12em;
	}
	
  #flags{
    margin-top: 3em;
    margin-inline: 1em;
    margin-bottom: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .flag-container{
    width: 45%;
    height:45%;
  }

  .flag-name{
    font-size: 0.7em;
    text-align: center;
    margin-top: 0.2em;
  }

</style>