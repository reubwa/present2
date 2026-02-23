<script lang="ts">
    let {entryTransition = $bindable(), exitTransition = $bindable(), transitionSpeed = $bindable()} = $props();
    import TransitionModal from "$lib/components/modals/TransitionModal.svelte";
	import TransitionSpeedModal from "$lib/components/modals/TransitionSpeedModal.svelte";
	import { TransitionModes } from "$lib/structs";
	import { CircleGauge, DoorOpen, FileDown, FileUp, Layers2, PanelTopClose, PanelTopOpen, Theater, Trash2 } from "@lucide/svelte";

    let transitionModalVisibility = $state(false);

    let transitionModal = $state(TransitionModes.Entry);

    let transitionSpeedModalVisibility = $state(false);
</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 text-white ml-1.25 mt-2 max-w-[48.5%]">
    <div class="flex flex-row gap-2.5">
        <button title="Entry Transition" class="flex flex-row gap-2.5" onclick={()=>{
            transitionModal = TransitionModes.Entry;
            transitionModalVisibility = true;
        }}>
            <Theater/>
            <p>{entryTransition}</p>
        </button>
        <button title="Entry Transition" class="flex flex-row gap-2.5" onclick={()=>{
            transitionModal = TransitionModes.Exit;
            transitionModalVisibility = true;
        }}>
            <DoorOpen/>
            <p>{exitTransition}</p>
        </button>
        <button title="Transition Speed" class="flex flex-row gap-2.5" onclick={()=>{transitionSpeedModalVisibility=true}}>
            <CircleGauge/>
            <p>{transitionSpeed}</p>
        </button>
        <button title="Import Slide" onclick={()=>{}}>
            <FileUp/>
        </button>
        <button title="Export Slide" onclick={()=>{}}>
            <FileDown/>
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
<TransitionSpeedModal bind:show={transitionSpeedModalVisibility} bind:result={transitionSpeed} />
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>