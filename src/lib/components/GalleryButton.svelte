<script lang="ts">
    let { icon, caption, clickEvent, iconSize } = $props();
</script>
<div class="flex flex-col items-center p-[10px] rounded-[10px] text-white" onclick={clickEvent} aria-roledescription="Toolbar Button">
    <svelte:component this={icon} size={iconSize} class="lucide-icon" />
    <p>{caption}</p>
</div>
<style>
    div:hover{
        cursor: pointer;
        background-color: rgb(46, 68, 68);
    }
    div{
        background-color: transparent;
        border: none;
    }
</style>    