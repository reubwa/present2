<script lang="ts">
	import BaseDialog from "./BaseDialog.svelte";
	import GalleryButton from "./GalleryButton.svelte";
    import {TransitionModes, Transitions} from "../../structs.svelte.ts";
	import { LensConcaveIcon, LensConvexIcon, PanelRightCloseIcon, SearchIcon, StarOffIcon, TurtleIcon } from "@lucide/svelte";

	let {show = $bindable(), result = $bindable(), mode = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

    function completeDialog(transition : Transitions){
        result = transition;
        show = false;
    }
</script>
<BaseDialog bind:dialog bind:show>
    {#if mode == TransitionModes.Entry}
        <h1 class="text-white font-bold">Entry Transition</h1>
    {:else if mode == TransitionModes.Exit}
        <h1 class="text-white font-bold">Exit Transition</h1>
    {/if}
    <div class="flex flex-col gap-2.5">
        <div class="flex flex-row gap-2.5">
            <GalleryButton iconSize=32 icon={StarOffIcon} caption="None" clickEvent={()=>{completeDialog(Transitions.None)}}/>
            <GalleryButton iconSize=32 icon={TurtleIcon} caption="Fade" clickEvent={()=>{completeDialog(Transitions.Fade)}}/>
            <GalleryButton iconSize=32 icon={PanelRightCloseIcon} caption="Slide" clickEvent={()=>{completeDialog(Transitions.Slide)}}/>
            <GalleryButton iconSize=32 icon={LensConvexIcon} caption="Convex" clickEvent={()=>{completeDialog(Transitions.Convex)}}/>
            <GalleryButton iconSize=32 icon={LensConcaveIcon} caption="Concave" clickEvent={()=>{completeDialog(Transitions.Concave)}}/>
            <GalleryButton iconSize=32 icon={SearchIcon} caption="Zoom" clickEvent={()=>{completeDialog(Transitions.Zoom)}}/>
        </div>
    </div>
</BaseDialog>