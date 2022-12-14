<script lang="ts">
  import { filteredCards } from "./cards";
</script>

<div class="grid m-auto gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
  {#each $filteredCards as card (card.id)}
  <div class="h-44 w-24">
    <div class="h-44 w-24 absolute hover:scale-105 transition-all cursor-pointer">
      <div class="bg-[url('$lib/cardFrame.png')] bg-center bg-no-repeat bg-[length:100%_100%] absolute h-full w-full z-10" />
      <img src={card.image} alt={card.name} class="absolute h-full w-full rounded-lg"/>
    </div>
  </div>
  {/each}
</div>