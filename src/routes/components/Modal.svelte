<script context="module" lang="ts">
  const modalList: HTMLElement[] = [];
</script>

<script lang="ts">
  import { modalStore } from '../modal';

const store = modalStore(false)
const { isOpen, open, close } = store
function keydown(e: KeyboardEvent) {
  e.stopPropagation()
  if (e.key === 'Enter') {
    close()
  }
}
function transitionend(e: TransitionEvent) {
  const node = e.target as HTMLElement;
  node.focus()
}

function modalAction(node: HTMLElement) {
  // @ts-ignore - :(
  const returnFn = []
  // for accessibility
  if (document.body.style.overflowY !== 'hidden') {
    const originalOverflowY = document.body.style.overflowY;
    const originalTop = window.pageYOffset;
    const originalScrollBarGutter = document.body.style.scrollbarGutter;
    document.body.style.overflowY = 'hidden';
    returnFn.push(() => {
      document.body.style.overflowY = originalOverflowY
    })
  }
  node.addEventListener('keydown', keydown)
  node.addEventListener('transitionend', transitionend)
  node.focus()
  modalList.push(node)
  returnFn.push(() => {
    node.removeEventListener('keydown', keydown)
    node.removeEventListener('transitionend', transitionend)
    modalList.pop()
    // Optional chaining to guard against empty array.
    modalList[modalList.length - 1]?.focus()
  })
  return {
    //@ts-ignore - :(
    destroy: () => returnFn.forEach((fn) => fn()),
  }
}
</script>

<style>
  div.modal:not(:focus-within) {
    transition: opacity 0.1ms;
    opacity: 0.99;
  }
</style>

<slot name="trigger" {open}>
  <!-- fallback trigger to open the modal -->
  <button on:click={open}>Open</button>
</slot>
{#if $isOpen}
  <div class="modal fixed top-0 left-0 w-full h-screen z-20 flex justify-center items-center" role="button" aria-label="Press enter to close modal" on:keydown={(e) => keydown(e)} on:click={close} use:modalAction tabindex="0">
    <div class="bg-black opacity-50 absolute h-full w-full"/>
    <div class="z-20">
      <slot name="content" {store} />
    </div>
  </div>
{/if}