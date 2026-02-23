<script lang="ts">
    let {entryTransition = $bindable(), exitTransition = $bindable()} = $props();
    import TransitionModal from "$lib/components/modals/TransitionModal.svelte";
	import TransitionSpeedModal from "$lib/components/modals/TransitionSpeedModal.svelte";
	import { TransitionModes } from "$lib/structs";
	import { DoorOpen, Download, Import, Layers2, PanelTopClose, PanelTopOpen, Theater, Trash2 } from "@lucide/svelte";

    let transitionModalVisibility = $state(false);

    let transitionModal = $state(TransitionModes.Entry);

    let transitionSpeedModalVisibility = $state(false);
    let transitionSpeedResponse = $state("");
</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 text-white">
    <div class="flex flex-row gap-2.5">
        <button title="Entry Transition" onclick={()=>{
            transitionModal = TransitionModes.Entry;
            transitionModalVisibility = true;
        }}>
            <Theater/>
        </button>
        <button title="Entry Transition" onclick={()=>{
            transitionModal = TransitionModes.Exit;
            transitionModalVisibility = true;
        }}>
            <DoorOpen/>
        </button>
    </div>
    <div class="flex flex-row gap-2.5 flex-wrap">
        <button title="Import" onclick={()=>{}}>
            <Import/>
        </button>
        <button title="Export" onclick={()=>{}}>
            <Download/>
        </button>
        <button title="Move Slide Up" onclick={()=>{}}>
            <PanelTopClose/>
        </button>
        <button title="Move Slide Down" onclick={()=>{}}>
            <PanelTopOpen/>
        </button>
        <button title="Duplicate Slide" onclick={()=>{}}>
            <Layers2/>
        </button>
        <button title="Remove Slide" onclick={()=>{}}>
            <Trash2/>
        </button>
    </div>
</div>
<TransitionModal 
    bind:show={transitionModalVisibility} 
    bind:result={
        () => transitionModal === TransitionModes.Entry ? entryTransition : exitTransition,
        (value) => {
            if (transitionModal === TransitionModes.Entry) {
                entryTransition = value;
            } else {
                exitTransition = value;
            }
        }
    } 
    bind:mode={transitionModal}
/>
<TransitionSpeedModal bind:show={transitionSpeedModalVisibility} bind:result={transitionSpeedResponse} />
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>