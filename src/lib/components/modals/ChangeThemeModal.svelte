<script lang="ts">
	import BaseDialog from "./BaseDialog.svelte";
    import {BuiltInThemes} from "../../structs.svelte.ts";
	import GalleryButtonThemePreview from "./GalleryButtonThemePreview.svelte";

	let {show = $bindable(), result = $bindable(), currentTheme = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

    function completeDialog(theme : BuiltInThemes){
        result = theme;
        show = false;
    }
</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">Set Theme</h1>
    <div class="flex flex-col gap-2.5">
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Beige} theme={BuiltInThemes.Beige} clickEvent={()=>{completeDialog(BuiltInThemes.Beige)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Blood} theme={BuiltInThemes.Blood} clickEvent={()=>{completeDialog(BuiltInThemes.Blood)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Black} theme={BuiltInThemes.Black} clickEvent={()=>{completeDialog(BuiltInThemes.Black)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.League} theme={BuiltInThemes.League} clickEvent={()=>{completeDialog(BuiltInThemes.League)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Moon} theme={BuiltInThemes.Moon} clickEvent={()=>{completeDialog(BuiltInThemes.Moon)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Night} theme={BuiltInThemes.Night} clickEvent={()=>{completeDialog(BuiltInThemes.Night)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Serif} theme={BuiltInThemes.Serif} clickEvent={()=>{completeDialog(BuiltInThemes.Serif)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Simple} theme={BuiltInThemes.Simple} clickEvent={()=>{completeDialog(BuiltInThemes.Simple)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Sky} theme={BuiltInThemes.Sky} clickEvent={()=>{completeDialog(BuiltInThemes.Sky)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Solarized} theme={BuiltInThemes.Solarized} clickEvent={()=>{completeDialog(BuiltInThemes.Solarized)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.White} theme={BuiltInThemes.White} clickEvent={()=>{completeDialog(BuiltInThemes.White)}}/>
            <GalleryButtonThemePreview selected={currentTheme===BuiltInThemes.Dracula} theme={BuiltInThemes.Dracula} clickEvent={()=>{completeDialog(BuiltInThemes.Dracula)}}/>
        </div>
    </div>
</BaseDialog>