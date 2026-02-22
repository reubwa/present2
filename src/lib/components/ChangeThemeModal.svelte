<script lang="ts">
	import BaseDialog from "./BaseDialog.svelte";
    import {BuiltInThemes} from "../structs.ts";
	import GalleryButtonThemePreview from "./GalleryButtonThemePreview.svelte";

	let {show = $bindable(), result = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

    function completeDialog(theme : BuiltInThemes){
        result = theme;
        show = false;
    }
</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">Add a Slide</h1>
    <div class="flex flex-col gap-2.5">
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview theme={BuiltInThemes.Beige} clickEvent={()=>{completeDialog(BuiltInThemes.Beige)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Blood} clickEvent={()=>{completeDialog(BuiltInThemes.Blood)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Black} clickEvent={()=>{completeDialog(BuiltInThemes.Black)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview theme={BuiltInThemes.League} clickEvent={()=>{completeDialog(BuiltInThemes.League)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Moon} clickEvent={()=>{completeDialog(BuiltInThemes.Moon)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Night} clickEvent={()=>{completeDialog(BuiltInThemes.Night)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview theme={BuiltInThemes.Serif} clickEvent={()=>{completeDialog(BuiltInThemes.Serif)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Simple} clickEvent={()=>{completeDialog(BuiltInThemes.Simple)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Sky} clickEvent={()=>{completeDialog(BuiltInThemes.Sky)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButtonThemePreview theme={BuiltInThemes.Solarized} clickEvent={()=>{completeDialog(BuiltInThemes.Solarized)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.White} clickEvent={()=>{completeDialog(BuiltInThemes.White)}}/>
            <GalleryButtonThemePreview theme={BuiltInThemes.Dracula} clickEvent={()=>{completeDialog(BuiltInThemes.Dracula)}}/>
        </div>
    </div>
</BaseDialog>