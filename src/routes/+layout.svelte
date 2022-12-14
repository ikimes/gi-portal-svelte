<script>
  import "../app.css";
  import { page } from '$app/stores';
</script>

<nav class="h-[5vh] bg-slate-900 flex items-center text-white">
  <a class:active={$page.url.pathname === '/'} class="ml-4 text-lg h-full hover:active transition-all" href="/">Home</a>
  <a class:active={$page.url.pathname === '/cards'} class="ml-4 text-lg h-full hover:active transition-all" href="/cards">Cards</a>
</nav>

<div class="bg-slate-700 h-full min-h-[95vh]">
  <slot></slot>
</div>