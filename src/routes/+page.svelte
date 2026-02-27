<script lang="ts">
	import BodySplit from "$lib/components/body/BodySplit.svelte";
	import BaseEditor from "$lib/components/body/editors/BaseEditor.svelte";
	import Inspector from "$lib/components/inspector/Inspector.svelte";
	import AboutModal from "$lib/components/modals/AboutModal.svelte";
	import AddSlideModal from "$lib/components/modals/AddSlideModal.svelte";
	import ChangeThemeModal from "$lib/components/modals/ChangeThemeModal.svelte";
	import NewPresModal from "$lib/components/modals/NewPresModal.svelte";
	import Sidebar from "$lib/components/sidebar/Sidebar.svelte";

	import Toolbar from "$lib/components/toolbar/Toolbar.svelte";
    import ToolbarButton from "$lib/components/toolbar/ToolbarButton.svelte";
	import ToolbarGroup from "$lib/components/toolbar/ToolbarGroup.svelte";
    import { FilePlusCorner, HardDriveDownload, HardDriveUpload, Info, LayersPlus, PresentationIcon, SquareArrowRightExit, SwatchBook } from "@lucide/svelte";
  import { Presentation, Slide, SlideTypes } from '../lib/structs.svelte.ts';

    let addSlideModalVisibility = $state(false);

    let changeThemeModalVisibility = $state(false);

    let newModalVisibility = $state(false);

    let aboutModalVisibility = $state(false);

    let selectedSlide = $state(0);

    let currentPres = $state(new Presentation("New Presentation"));

    $effect(()=>{
        if(currentPres.slides.length < 1){
            currentPres.slides.push(new Slide(SlideTypes.TitleSubtitle));
        }
        document.title = currentPres.title;
    });
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
        <ToolbarButton iconSize=32 icon={PresentationIcon} caption="Present" clickEvent={()=>{}}/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={Info} caption="About" clickEvent={()=>aboutModalVisibility=true}/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={addSlideModalVisibility} bind:presentation={currentPres}/>
<ChangeThemeModal bind:show={changeThemeModalVisibility} bind:result={currentPres.theme}/>
<NewPresModal bind:show={newModalVisibility} bind:presentation={currentPres}/>
<AboutModal bind:show={aboutModalVisibility} />
{#if currentPres.slides.length > 0}
<Inspector bind:slides={currentPres.slides} bind:selectedSlide={selectedSlide} bind:entryTransition={currentPres.slides[selectedSlide].entryTransition} bind:exitTransition={currentPres.slides[selectedSlide].exitTransition} bind:transitionSpeed={currentPres.slides[selectedSlide].transitionSpeeds}/>
<BodySplit>
    <Sidebar bind:slides={currentPres.slides} bind:selectedIndex={selectedSlide}/>
    <BaseEditor bind:slides={currentPres.slides} bind:selectedIndex={selectedSlide}/>
</BodySplit>
{/if}

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>