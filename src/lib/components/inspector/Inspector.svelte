<script lang="ts">
    import { arrayMoveMutable } from 'array-move';

    let {entryTransition = $bindable(), exitTransition = $bindable(), transitionSpeed = $bindable(), slides = $bindable(), selectedSlide = $bindable()} = $props();
    import TransitionModal from "$lib/components/modals/TransitionModal.svelte";
	import TransitionSpeedModal from "$lib/components/modals/TransitionSpeedModal.svelte";
    import {
        SlideContent,
        Slide,
        SlideTypes,
        TransitionModes,
        Transitions,
        TransitionSpeeds
    } from '../../structs.svelte.ts';
	import { CircleGauge, DoorOpen, FileDown, FileUp, Layers2, PanelTopClose, PanelTopOpen, Theater, Trash2 } from "@lucide/svelte";

    let transitionModalVisibility = $state(false);

    let transitionModal = $state(TransitionModes.Entry);

    let transitionSpeedModalVisibility = $state(false);

    function exportSlide() {
        try {
            // Ensure all required properties exist and are valid
            if (!slides[selectedSlide] || !slides[selectedSlide].title || slides[selectedSlide].title.trim() === '') {
                alert('Cannot save: Presentation must have a title');
                return;
            }

            if (!slides[selectedSlide].content) {
                alert('Cannot export: Slide must have some content');
                return;
            }

            // Create a clean serializable object with no null properties
            const presData = {
                title: slides[selectedSlide].title || '',
                number: slides[selectedSlide].number || selectedSlide + 1,
                entryTransition: slides[selectedSlide].entryTransition || Transitions.None,
                exitTransition: slides[selectedSlide].exitTransition || Transitions.None,
                transitionSpeeds: slides[selectedSlide].transitionSpeeds || TransitionSpeeds.Default,
                content: {
                    type: slides[selectedSlide].content?.type || SlideTypes.TitleSubtitle,
                    strings: slides[selectedSlide].content?.strings || []
                }
            };

            const jsonString = JSON.stringify(presData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `${slides[selectedSlide].title.trim().replace(/[^a-z0-9]/gi, '_')}.presentslide`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting slide:', error);
            alert(`Failed to export slide: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async function importSlide() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.presentslide';

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

                // Validate content exists
                if (!json.content) {
                    throw new Error('Invalid file format: missing content');
                }

                // Create a single validated slide from the imported data
                const slideType = (json.content?.type && Object.values(SlideTypes).includes(json.content.type))
                    ? json.content.type
                    : SlideTypes.TitleSubtitle;

                const slideTitle = (typeof json.title === 'string') ? json.title : '';
                const slideNumber = slides.length + 1;

                const entryTransition = (json.entryTransition && Object.values(Transitions).includes(json.entryTransition))
                    ? json.entryTransition
                    : Transitions.None;

                const exitTransition = (json.exitTransition && Object.values(Transitions).includes(json.exitTransition))
                    ? json.exitTransition
                    : Transitions.None;

                const transitionSpeeds = (json.transitionSpeeds && Object.values(TransitionSpeeds).includes(json.transitionSpeeds))
                    ? json.transitionSpeeds
                    : TransitionSpeeds.Default;

                const strings = Array.isArray(json.content?.strings) ? json.content.strings : [];

                const importedSlide = new Slide(
                    slideType,
                    slideTitle,
                    new SlideContent(slideType, strings),
                    slideNumber,
                    entryTransition,
                    exitTransition,
                    transitionSpeeds
                );

                // Add the slide to the current presentation
                slides.push(importedSlide);
                selectedSlide = slides.length - 1;

            } catch (error) {
                console.error('Error importing slide:', error);
                alert(`Failed to import slide: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        };

        input.click();
    }


</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 text-white ml-1.25 mt-2 max-w-[48.5%]">
    <div class="flex flex-row gap-2.5">
        <button title="Entry Transition" class="flex flex-row gap-2.5" onclick={()=>{
            transitionModal = TransitionModes.Entry;
            transitionModalVisibility = true;
        }}>
            <Theater/>
            {entryTransition}
        </button>
        <button title="Entry Transition" class="flex flex-row gap-2.5" onclick={()=>{
            transitionModal = TransitionModes.Exit;
            transitionModalVisibility = true;
        }}>
            <DoorOpen/>
            {exitTransition}
        </button>
        <button title="Transition Speed" class="flex flex-row gap-2.5" onclick={()=>{transitionSpeedModalVisibility=true}}>
            <CircleGauge/>
            {transitionSpeed}
        </button>
        <button title="Import Slide" onclick={()=>{importSlide()}}>
            <FileUp/>
        </button>
        <button title="Export Slide" onclick={()=>{exportSlide()}}>
            <FileDown/>
        </button>
        <button title="Move Slide Up" onclick={()=>{
            if (selectedSlide > 0) {
                slides[selectedSlide].number -= 1;
                slides[selectedSlide - 1].number += 1;
                arrayMoveMutable(slides, selectedSlide, selectedSlide - 1);
                selectedSlide -= 1;
            }
        }}>
            <PanelTopClose/>
        </button>
        <button title="Move Slide Down" onclick={()=>{
            if (selectedSlide < slides.length - 1) {
                slides[selectedSlide].number += 1;
                slides[selectedSlide + 1].number -= 1;
                arrayMoveMutable(slides, selectedSlide, selectedSlide + 1);
                selectedSlide += 1;
            }
        }}>
            <PanelTopOpen/>
        </button>
        <button title="Duplicate Slide" onclick={()=>{slides.push(slides[selectedSlide])}}>
            <Layers2/>
        </button>
        <button title="Remove Slide" onclick={()=>{slides.splice(selectedSlide,1)}}>
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