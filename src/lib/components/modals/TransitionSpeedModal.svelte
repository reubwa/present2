<script lang="ts">
	import { CircleSlash2Icon, RabbitIcon, TurtleIcon } from "@lucide/svelte";
	import BaseDialog from "./BaseDialog.svelte";
	import GalleryButton from "./GalleryButton.svelte";
    import {TransitionSpeeds} from "../../structs.svelte.ts";

	let {show = $bindable(), result = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

    function completeDialog(speed : TransitionSpeeds){
        result = speed;
        show = false;
    }
</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">Transition Speed</h1>
    <div class="flex flex-col gap-2.5">
        <div class="flex flex-row gap-2.5">
            <GalleryButton iconSize=32 icon={CircleSlash2Icon} caption="Default" clickEvent={()=>{completeDialog(TransitionSpeeds.Default)}}/>
            <GalleryButton iconSize=32 icon={RabbitIcon} caption="Fast" clickEvent={()=>{completeDialog(TransitionSpeeds.Fast)}}/>
            <GalleryButton iconSize=32 icon={TurtleIcon} caption="Slow" clickEvent={() => {completeDialog(TransitionSpeeds.Slow)}}/>
        </div>
    </div>
</BaseDialog>