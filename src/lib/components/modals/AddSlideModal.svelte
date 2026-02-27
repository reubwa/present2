<script lang="ts">
	import { ListIcon, BookTextIcon, AArrowDownIcon, Image, SquareSigmaIcon, Code } from "@lucide/svelte";
	import BaseDialog from "./BaseDialog.svelte";
	import GalleryButton from "./GalleryButton.svelte";
  import { Slide, SlideTypes } from '../../structs.svelte.ts';

	let {show = $bindable(), presentation = $bindable(), selectedSlide = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

    function completeDialog(slidetype : SlideTypes){
        presentation.addSlide(new Slide(slidetype));
        selectedSlide = presentation.slides.length - 1;
        show = false;
    }
</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">Add a Slide</h1>
    <div class="flex flex-col gap-2.5">
        <div class="flex flex-row gap-2.5">
            <GalleryButton iconSize=32 icon={ListIcon} caption="Text and Bullet Points" clickEvent={()=>{completeDialog(SlideTypes.TextBullets)}}/>
            <GalleryButton iconSize=32 icon={BookTextIcon} caption="Title and Subtitle" clickEvent={()=>{completeDialog(SlideTypes.TitleSubtitle)}}/>
        </div>
        <div class="flex flex-row gap-2.5">
            <GalleryButton iconSize=32 icon={AArrowDownIcon} caption="Markdown" clickEvent={()=>{completeDialog(SlideTypes.Markdown)}}/>
            <GalleryButton iconSize=32 icon={Image} caption="Image" clickEvent={()=>{completeDialog(SlideTypes.Image)}}/>
            <GalleryButton iconSize=32 icon={SquareSigmaIcon} caption="Maths" clickEvent={()=>{completeDialog(SlideTypes.Maths)}}/>
            <GalleryButton iconSize=32 icon={Code} caption="Code" clickEvent={()=>{completeDialog(SlideTypes.Code)}}/>
        </div>
    </div>
</BaseDialog>