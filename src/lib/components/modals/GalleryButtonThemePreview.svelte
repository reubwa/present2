<script lang="ts">
	import { base } from "$app/paths";

    let { theme, clickEvent } = $props();
</script>
<div class="flex flex-col items-center p-[10px] rounded-[10px] text-white" onclick={clickEvent} aria-roledescription="Toolbar Button">
    <img src="{base}/theme-previews/{theme.toLowerCase()}.png" title={theme} alt="Preview of {theme} theme"/>
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