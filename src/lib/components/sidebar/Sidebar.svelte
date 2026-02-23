<script lang="ts">
  import SidebarElement from "./SidebarElement.svelte";
  let { slides = $bindable() } = $props();
  let selectedIndex = $state(0);
</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 text-white mt-1.25 ml-1.25">
    {#each slides as slide, i}
        <SidebarElement 
            name={slide.title} 
            type={slide.content.type} 
            selected={selectedIndex === i}
            onclick={() => selectedIndex = i}
        />
    {/each}
</div>
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>