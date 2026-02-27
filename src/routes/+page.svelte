<script>
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
    import { FilePlusCorner, HardDriveDownload, HardDriveUpload, Info, LayersPlus, Presentation, SquareArrowRightExit, SwatchBook } from "@lucide/svelte";
  import { SlideTypes, Transitions, TransitionSpeeds } from '../lib/structs.ts';

    let addSlideModalVisibility = $state(false);
	  let addSlideResponse = $state("");

    let changeThemeModalVisibility = $state(false);
    let changeThemeResponse = $state("");

    let newModalVisibility = $state(false);
    let newResponse = $state("");

    let aboutModalVisibility = $state(false);

    let selectedSlide = $state(0);

    let Slides = $state([
        {
            title: "Slide 1",
            number: 1,
            entryTransition: Transitions.None,
            exitTransition: Transitions.None,
            transitionSpeeds: TransitionSpeeds.Default,
            content: {
                type: SlideTypes.TextBullets,
                strings: "This is the first slide"
            }
        },
        {
            title: "Slide 2",
            number: 2,
            entryTransition: Transitions.None,
            exitTransition: Transitions.None,
            transitionSpeeds: TransitionSpeeds.Default,
            content: {
                type: SlideTypes.Markdown,
                strings: "This is the second slide"
            }
        },
        {
            title: "Slide 3",
            number: 3,
            entryTransition: Transitions.None,
            exitTransition: Transitions.None,
            transitionSpeeds: TransitionSpeeds.Default,
            content: {
                type: SlideTypes.TextBullets,
                strings: "This is the third slide"
            }
        }
    ]);
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
<NewPresModal bind:show={newModalVisibility} bind:result={newResponse}/>
<AboutModal bind:show={aboutModalVisibility} />
<Inspector bind:slides={Slides} bind:selectedSlide={selectedSlide} bind:entryTransition={Slides[selectedSlide].entryTransition} bind:exitTransition={Slides[selectedSlide].exitTransition} bind:transitionSpeed={Slides[selectedSlide].transitionSpeeds}/>
<BodySplit>
    <Sidebar bind:slides={Slides} bind:selectedIndex={selectedSlide}/>
    <BaseEditor bind:slides={Slides} bind:selectedIndex={selectedSlide}/>
</BodySplit>

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>