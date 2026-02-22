<script lang="ts">
	import { BuiltInThemes } from "$lib/structs";

    let { theme, clickEvent } = $props();
</script>
<div class="flex flex-col items-center p-[10px] rounded-[10px] text-white" onclick={clickEvent} aria-roledescription="Toolbar Button">
    {#if theme == BuiltInThemes.Beige}
        <img src="/theme-previews/beige.png" title="Beige"/>
    {:else if theme == BuiltInThemes.Black}
        <img src="/theme-previews/black.png" title="Black"/>
    {:else if theme == BuiltInThemes.Blood}
        <img src="/theme-previews/blood.png" title="Blood"/>
    {:else if theme == BuiltInThemes.Dracula}
        <img src="/theme-previews/dracula.png" title="Dracula"/>
    {:else if theme == BuiltInThemes.League}
        <img src="/theme-previews/league.png" title="League"/>
    {:else if theme == BuiltInThemes.Moon}
        <img src="/theme-previews/moon.png" title="Moon"/>
    {:else if theme == BuiltInThemes.Night}
        <img src="/theme-previews/night.png" title="Night"/>
    {:else if theme == BuiltInThemes.Serif}
        <img src="/theme-previews/serif.png" title="Serif"/>
    {:else if theme == BuiltInThemes.Simple}
        <img src="/theme-previews/simple.png" title="Simple"/>
    {:else if theme == BuiltInThemes.Sky}
        <img src="/theme-previews/sky.png" title="Sky"/>
    {:else if theme == BuiltInThemes.Solarized}
        <img src="/theme-previews/solarized.png" title="Solarized"/>
    {:else if theme == BuiltInThemes.White}
        <img src="/theme-previews/white.png" title="White"/>
    {/if}
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