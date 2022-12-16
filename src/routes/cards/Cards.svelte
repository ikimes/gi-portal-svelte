<script lang="ts">
  import { filteredCards } from "./cards";
  import Modal from '../components/Modal.svelte';
  import { ECardTypes } from "./cards";
  // trim image source parameters that are lowering the resolution of images - will need to be refactored depending how we handle images in the future
  function hiResImage(imgSource: string) {
    const urlObj = new URL(imgSource);
    urlObj.search = '';
    return urlObj.toString();
  }
  // allows us to use enum dynamically - ie. ECardTypes[`${variableKey}`]
  const getCardType = (key: string) => ECardTypes[key as keyof typeof ECardTypes];
</script>

<div class="grid m-auto gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 mb-4">
  {#each $filteredCards as card (card.id)}
  <Modal>
    <!-- card on page, clicking it triggers modal content to show -->
    <div class="h-44 w-24" slot="trigger" let:open>
      <button class="h-44 w-24 absolute focus:scale-105 hover:scale-105 transition-all cursor-pointer flex" on:click={open}>
        <div class="bg-[url('$lib/cardFrame.png')] bg-center bg-no-repeat bg-[length:100%_100%] absolute h-full w-full z-10" />
        <img src={card.image} alt={card.name} class="absolute h-full w-full rounded-lg"/>
      </button>
    </div>
    <!-- below div is slotted into the content area of modal -->
    <div slot="content" let:store={{close}}>
      <div class="flex sm:min-w-[60vw] sm:max-w-[90vw] flex-col sm:flex-row">
        <div class="sm:basis-1/4 flex items-center justify-center">
          <div class="h-64 w-40 sm:w-56 sm:h-96 relative">
            <div class="bg-[url('$lib/cardFrame.png')] bg-center bg-no-repeat bg-[length:100%_100%] absolute h-full w-full z-10" />
            <img src={hiResImage(card.image)} alt={card.name} class="absolute h-full w-full rounded-lg"/>
            <div class="flex items-center w-full justify-center absolute sm:bottom-[-3rem] bottom-0 right-[-7rem] sm:right-0 z-30">
              <button class="text-slate-900 bg-white rounded-md p-2 text-lg font-bold" on:click={close}>Close</button>
            </div>    
          </div>
        </div>
        <div class="sm:basis-3/4 mt-4 sm:m-4 sm:max-w-[50vw] max-h-[55vh] flex justify-center">
          <div class="flex w-full">
            <div class="rounded-lg bg-slate-700 h-full border-solid border-2 border-[#e4d9cc] p-2 basis-full overflow-scroll no-scrollbar">
              <h1 class="sm:text-3xl text-white flex items-center"><span class="basis-3/4 font-bold">{card.name}</span><small class="text-sm basis-1/4 flex justify-end text-right">{getCardType(card.card_type)}</small></h1>
              {#if card.card_skills.length > 0}
                {@const skills = card.card_skills}
                {#each skills as skill}
                <div class="flex flex-row flex-wrap mt-2 sm:m-4 p-2 bg-slate-900 text-white rounded-md">
                  <h2 class="flex items-center w-full"><span class="basis-3/4 font-bold">{skill.name}</span><small class="sm:text-sm basis-1/4 flex justify-end text-right">{skill.tag}</small></h2>
                  <p class="p-2 break-word">{skill.desc}</p>
                </div>
                {/each}
              {:else}
                <p class="m-4 p-4 text-white text-xl break-word">{card.desc}</p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div> 
  </Modal>
  {/each}
</div>