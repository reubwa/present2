<script>
	import AboutModal from "$lib/components/modals/AboutModal.svelte";
	import AddSlideModal from "$lib/components/modals/AddSlideModal.svelte";
	import ChangeThemeModal from "$lib/components/modals/ChangeThemeModal.svelte";
	import NewPresModal from "$lib/components/modals/NewPresModal.svelte";
	import TransitionModal from "$lib/components/modals/TransitionModal.svelte";
	import TransitionSpeedModal from "$lib/components/modals/TransitionSpeedModal.svelte";
	import Toolbar from "$lib/components/toolbar/Toolbar.svelte";
    import ToolbarButton from "$lib/components/toolbar/ToolbarButton.svelte";
	import ToolbarGroup from "$lib/components/toolbar/ToolbarGroup.svelte";
	import { TransitionModes } from "$lib/structs";
    import { FilePlusCorner, HardDriveDownload, HardDriveUpload, Info, LayersPlus, Presentation, SquareArrowRightExit, SwatchBook } from "@lucide/svelte";

    let addSlideModalVisibility = $state(false);
	let addSlideResponse = $state("");

    let changeThemeModalVisibility = $state(false);
    let changeThemeResponse = $state("");

    let transitionModalVisibility = $state(false);
    let transitionResponse = $state("");

    let transitionModal = $state();

    let transitionSpeedModalVisibility = $state(false);
    let transitionSpeedResponse = $state("");

    let newModalVisibility = $state(false);
    let newResponse = $state("");

    let aboutModalVisibility = $state(false);
</script>

<Toolbar>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={FilePlusCorner} caption="New" clickEvent={()=>{newModalVisibility=true}}/>
        <ToolbarButton iconSize=32 icon={HardDriveUpload} caption="Open" clickEvent={()=>{}}/>
        <ToolbarButton iconSize=32 icon={HardDriveDownload} caption="Save" clickEvent={()=>{}}/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={LayersPlus} caption="Add Slide" clickEvent={()=>{addSlideModalVisibility=true}}/>
        <ToolbarButton iconSize=32 icon={SwatchBook} caption="Theme" clickEvent={()=>{changeThemeModalVisibility=true}}/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={SquareArrowRightExit} caption="Export" clickEvent={()=>{}}/>
        <ToolbarButton iconSize=32 icon={Presentation} caption="Present" clickEvent={()=>{}}/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={Info} caption="About" clickEvent={()=>aboutModalVisibility=true}/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={addSlideModalVisibility} bind:result={addSlideResponse}/>
<ChangeThemeModal bind:show={changeThemeModalVisibility} bind:result={changeThemeResponse} />
<TransitionModal bind:show={transitionModalVisibility} bind:result={transitionResponse} bind:mode={transitionModal}/>
<TransitionSpeedModal bind:show={transitionSpeedModalVisibility} bind:result={transitionSpeedResponse} />
<NewPresModal bind:show={newModalVisibility} bind:result={newResponse}/>
<AboutModal bind:show={aboutModalVisibility} />

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>