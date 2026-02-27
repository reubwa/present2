<script lang="ts">
	import { SlideTypes } from '../../structs.svelte.ts';
	import { AArrowDownIcon, BookTextIcon, Code, Image, ListIcon, SquareSigmaIcon } from "@lucide/svelte";

  let { selected, name, type, onclick } = $props();
</script>
<div class={selected ? 'div-sel' : 'div-nsel'} onclick={onclick}>
    {#if type == SlideTypes.TextBullets}
        <ListIcon/>
    {:else if type == SlideTypes.TitleSubtitle}
        <BookTextIcon/>
    {:else if type == SlideTypes.Markdown}
        <AArrowDownIcon/>
    {:else if type == SlideTypes.Image}
        <Image/>
    {:else if type == SlideTypes.Maths}
        <SquareSigmaIcon/>
    {:else if type == SlideTypes.Code}
        <Code/>
    {/if}
    <p>{name}</p>
</div>
<style>
    .div-nsel, .div-sel{
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        padding: 5px;
    }
    .div-sel {
        background-color: rgb(46, 68, 68);
        border-radius: 10px;
    }
    div:hover {
        cursor: pointer;
        background-color: rgb(46, 68, 68);
        border-radius: 10px;
    }
</style>