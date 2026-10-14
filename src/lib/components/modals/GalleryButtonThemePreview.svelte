<script lang="ts">
    import { asset } from '$app/paths';

    let { theme, clickEvent, selected } = $props();

    let previewSrc = $derived(
      asset(`theme-previews/${theme.toLowerCase()}.png` as Parameters<typeof asset>[0])
    );
</script>
<div class="flex flex-col items-center p-[10px] rounded-[10px] text-white" class:sel={selected} onclick={clickEvent} aria-roledescription="Toolbar Button">
    <img src={previewSrc} title={theme} alt="Preview of {theme} theme"/>
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
    .sel {
        background-color: rgb(46, 68, 68);
    }
</style>