<script lang="ts">
  import { SlideTypes } from '../../../structs.svelte.ts';
  import TitleSubtitleEditor from '$lib/components/body/editors/TitleSubtitleEditor.svelte';
  import MarkdownEditor from '$lib/components/body/editors/MarkdownEditor.svelte';
  import CodeEditor from '$lib/components/body/editors/CodeEditor.svelte';
  import MathsEditor from '$lib/components/body/editors/MathsEditor.svelte';
  import ImageEditor from '$lib/components/body/editors/ImageEditor.svelte';
  import BulletEditor from '$lib/components/body/editors/BulletEditor.svelte';

  let { slides = $bindable(), selectedIndex = $bindable() } = $props();
</script>
<div class="rounded-[10px] min-w-[82%] max-w-[82%] max-h-screen p-2.5">
    {#if slides[selectedIndex].content.type === SlideTypes.TitleSubtitle}
        <TitleSubtitleEditor bind:title={slides[selectedIndex].title} bind:subtitle={slides[selectedIndex].content.strings[0]}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.Markdown}
        <MarkdownEditor bind:content={slides[selectedIndex].content.strings[0]}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.Code}
        <CodeEditor bind:content={slides[selectedIndex].content.strings[0]} bind:title={slides[selectedIndex].title}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.Image}
        <ImageEditor bind:url={slides[selectedIndex].content.strings[0]} bind:title={slides[selectedIndex].title}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.Maths}
        <MathsEditor bind:content={slides[selectedIndex].content.strings[0]} bind:title={slides[selectedIndex].title}/>
    {:else if slides[selectedIndex].content.type === SlideTypes.TextBullets}
        <BulletEditor bind:strings={slides[selectedIndex].content.strings} bind:title={slides[selectedIndex].title}/>
    {/if}
</div>
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>