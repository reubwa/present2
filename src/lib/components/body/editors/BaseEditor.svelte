<script lang="ts">
  import { SlideTypes } from '../../../structs.svelte.ts';
  import TitleSubtitleEditor from '$lib/components/body/editors/TitleSubtitleEditor.svelte';

  let { slides = $bindable(), selectedIndex = $bindable() } = $props();
</script>
<div class="rounded-[10px] min-w-[82%] max-w-[82%] h-full p-2.5">
    {#if slides[selectedIndex].content.type === SlideTypes.TitleSubtitle}
        <TitleSubtitleEditor bind:title={slides[selectedIndex].title} bind:subtitle={slides[selectedIndex].content.strings[1]}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.Markdown}
        <p>Markdown</p>
    {:else if slides[selectedIndex].content.type === SlideTypes.Code}
        <!---placeholder--->
    {:else if slides[selectedIndex].content.type === SlideTypes.Image}
        <!---placeholder--->
    {:else if slides[selectedIndex].content.type === SlideTypes.Maths}
        <!---placeholder--->
    {:else if slides[selectedIndex].content.type === SlideTypes.TextBullets}
        <p>Text Bullets</p>
    {/if}
</div>
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>