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
    import { FilePlusCorner, HardDriveDownload, HardDriveUpload, Info, LayersPlus, PresentationIcon, Printer, SwatchBook } from "@lucide/svelte";
  import { Slide, SlideContent, SlideTypes, BuiltInThemes, Transitions, TransitionSpeeds } from '../lib/structs.svelte';
  import { currentPresentation } from '../lib/store.svelte';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';

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

    $effect(()=>{
        if(currentPresentation.slides.length < 1){
            currentPresentation.slides.push(new Slide(SlideTypes.TitleSubtitle));
        }
        document.title = currentPresentation.title;
    });

  function savePresentation() {
      try {
          // Ensure all required properties exist and are valid
          if (!currentPresentation || !currentPresentation.title || currentPresentation.title.trim() === '') {
              alert('Cannot save: Presentation must have a title');
              return;
          }

          if (!currentPresentation.slides || currentPresentation.slides.length === 0) {
              alert('Cannot save: Presentation must have at least one slide');
              return;
          }

          // Create a clean serializable object with no null properties
          const presData = {
              title: currentPresentation.title.trim(),
              theme: currentPresentation.theme || BuiltInThemes.White,
              slides: currentPresentation.slides.map((slide: Slide, index: number) => ({
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
          link.download = `${currentPresentation.title.trim().replace(/[^a-z0-9]/gi, '_')}.present`;
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

              console.log('=== Opening presentation ===');
              console.log('Validated slides count:', validatedSlides.length);
              console.log('Theme:', theme);
              console.log('Title:', json.title.trim());

              // Update the reactive presentation object
              currentPresentation.title = json.title.trim();
              currentPresentation.theme = theme;
              currentPresentation.slides = validatedSlides;

              selectedSlide = 0;

              console.log('After update - currentPresentation:', currentPresentation);
              console.log('After update - slides length:', currentPresentation.slides.length);
              console.log('After update - first slide:', currentPresentation.slides[0]);
              console.log('=== Presentation loaded ===');

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
        <ToolbarButton iconSize=32 icon={Printer} caption="Print to PDF" clickEvent={()=>{goto(base + '/present?print-pdf')}}/>
        <ToolbarButton iconSize=32 icon={PresentationIcon} caption="Present" clickEvent={()=>{goto(base + '/present')}}/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton iconSize=32 icon={Info} caption="About" clickEvent={()=>aboutModalVisibility=true}/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={addSlideModalVisibility} presentation={currentPresentation} bind:selectedSlide = {selectedSlide}/>
<ChangeThemeModal bind:show={changeThemeModalVisibility} bind:result={currentPresentation.theme}/>
<NewPresModal bind:show={newModalVisibility} presentation={currentPresentation}/>
<AboutModal bind:show={aboutModalVisibility} />
{#if currentPresentation.slides.length > 0}
<Inspector bind:slides={currentPresentation.slides} bind:selectedSlide={selectedSlide} bind:entryTransition={currentPresentation.slides[selectedSlide].entryTransition} bind:exitTransition={currentPresentation.slides[selectedSlide].exitTransition} bind:transitionSpeed={currentPresentation.slides[selectedSlide].transitionSpeeds}/>
<BodySplit>
    <Sidebar bind:slides={currentPresentation.slides} bind:selectedIndex={selectedSlide}/>
    <BaseEditor bind:slides={currentPresentation.slides} bind:selectedIndex={selectedSlide}/>
</BodySplit>
{/if}

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
        button{
            background-color: rgb(46, 68, 68);
            border-style: none;
            border-radius: 10px;
            color: white;
            padding: 10px;
        }
        button:hover {
            cursor: pointer;
            background-color: rgb(66, 98, 98);
        }
    </style>
</svelte:head>