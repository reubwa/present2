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
  import { Presentation, Slide, SlideContent, SlideTypes, BuiltInThemes, Transitions, TransitionSpeeds } from '../lib/structs.svelte.ts';

    interface JsonSlideData {
        title?: string;
        number?: number;
        entryTransition?: string;
        exitTransition?: string;
        transitionSpeeds?: string;
        content?: {
            type?: string;
            strings?: string[];
        };
    }

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

  function savePresentation() {
      try {
          // Ensure all required properties exist and are valid
          if (!currentPres || !currentPres.title || currentPres.title.trim() === '') {
              alert('Cannot save: Presentation must have a title');
              return;
          }

          if (!currentPres.slides || currentPres.slides.length === 0) {
              alert('Cannot save: Presentation must have at least one slide');
              return;
          }

          // Create a clean serializable object with no null properties
          const presData = {
              title: currentPres.title.trim(),
              theme: currentPres.theme || BuiltInThemes.White,
              slides: currentPres.slides.map((slide, index) => ({
                  title: slide.title || '',
                  number: slide.number || index + 1,
                  entryTransition: slide.entryTransition || Transitions.None,
                  exitTransition: slide.exitTransition || Transitions.None,
                  transitionSpeeds: slide.transitionSpeeds || TransitionSpeeds.Default,
                  content: {
                      type: slide.content?.type || SlideTypes.TitleSubtitle,
                      strings: slide.content?.strings || []
                  }
              }))
          };

          const jsonString = JSON.stringify(presData, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
          const url = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = `${currentPres.title.trim().replace(/[^a-z0-9]/gi, '_')}.present`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          URL.revokeObjectURL(url);
      } catch (error) {
          console.error('Error saving presentation:', error);
          alert(`Failed to save presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
  }


  async function openPresentation() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.present';

      input.onchange = async (e: Event) => {
          const target = e.target as HTMLInputElement;
          const file = target.files?.[0];

          if (!file) {
              console.warn('No file selected');
              return;
          }

          try {
              const text = await file.text();

              if (!text || text.trim() === '') {
                  throw new Error('File is empty');
              }

              const json = JSON.parse(text);

              // Validate required properties
              if (!json || typeof json !== 'object') {
                  throw new Error('Invalid file format: not a valid JSON object');
              }

              if (!json.title || typeof json.title !== 'string' || json.title.trim() === '') {
                  throw new Error('Invalid file format: missing or invalid title');
              }

              if (!Array.isArray(json.slides)) {
                  throw new Error('Invalid file format: slides must be an array');
              }

              // Create presentation with validated data
              const validatedSlides = json.slides.map((s: JsonSlideData, index: number) => {
                  const slideType = (s?.content?.type && Object.values(SlideTypes).includes(s.content.type))
                      ? s.content.type
                      : SlideTypes.TitleSubtitle;

                  const slideTitle = (typeof s?.title === 'string') ? s.title : '';
                  const slideNumber = (typeof s?.number === 'number') ? s.number : index + 1;

                  const entryTransition = (s?.entryTransition && Object.values(Transitions).includes(s.entryTransition))
                      ? s.entryTransition
                      : Transitions.None;

                  const exitTransition = (s?.exitTransition && Object.values(Transitions).includes(s.exitTransition))
                      ? s.exitTransition
                      : Transitions.None;

                  const transitionSpeeds = (s?.transitionSpeeds && Object.values(TransitionSpeeds).includes(s.transitionSpeeds))
                      ? s.transitionSpeeds
                      : TransitionSpeeds.Default;

                  const strings = Array.isArray(s?.content?.strings) ? s.content.strings : [];

                  return new Slide(
                      slideType,
                      slideTitle,
                      new SlideContent(slideType, strings),
                      slideNumber,
                      entryTransition,
                      exitTransition,
                      transitionSpeeds
                  );
              });

              const theme = (json.theme && Object.values(BuiltInThemes).includes(json.theme))
                  ? json.theme
                  : BuiltInThemes.White;

              currentPres = new Presentation(
                  json.title.trim(),
                  theme,
                  validatedSlides
              );

              selectedSlide = 0;

          } catch (error) {
              console.error('Error opening presentation:', error);
              alert(`Failed to open presentation: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
      };

      input.click();
  }
</script>

<Toolbar>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={FilePlusCorner} caption="New" clickEvent={()=>{newModalVisibility=true}}/>
        <ToolbarButton iconSize=32 icon={HardDriveUpload} caption="Open" clickEvent={()=>{openPresentation()}}/>
        <ToolbarButton iconSize=32 icon={HardDriveDownload} caption="Save" clickEvent={()=>{savePresentation()}}/>
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

<AddSlideModal bind:show={addSlideModalVisibility} bind:presentation={currentPres} bind:selectedSlide = {selectedSlide}/>
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