<script lang="ts">
  import SidebarElement from "./SidebarElement.svelte";
  let { slides = $bindable(), selectedIndex = $bindable() } = $props();
</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 max-w-[15%] min-w-[15%] text-white">
    {#each slides as slide, i (i)}
        <SidebarElement 
            bind:name={slide.title}
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