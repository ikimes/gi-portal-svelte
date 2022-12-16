<script lang="ts">
  import filters, { type CardFilters} from './cardFilters';
  import { cardFilter } from "./cards";
</script>

<div class="flex mb-4 justify-center">
  <div class="bg-slate-900 rounded-lg flex flex-wrap w-[80%] sm:w-auto justify-center flex-col sm:flex-row mb-4">
    {#each Object.entries(filters) as [key,filter]}
    <button class="{$cardFilter === filter ? 'p-4 text-slate-700 bg-white rounded-lg font-bold' : 'font-bold p-4 text-white rounded-lg hover:text-slate-700 hover:bg-white transition-all'}" on:click={() => cardFilter.set(filter)}>{key}</button>
    {/each}
  </div>
</div>