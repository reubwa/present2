<script lang="ts">
	import { SquareArrowRightExitIcon } from "@lucide/svelte";
    import BaseDialog from "./BaseDialog.svelte";
  import { BuiltInThemes } from '../../structs.svelte.ts';

	let {show = $bindable(), presentation = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

  let result = $state("");
  function completeDialog(e : SubmitEvent | undefined){
      e?.preventDefault()
      if (presentation) {
          presentation.slides = [];
          presentation.title = result;
          presentation.theme = BuiltInThemes.White;
      }
      result = "";
      show = false;
  }
</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">New Presentation</h1>
    <form class="flex flex-row gap-2.5" onsubmit={(e) => completeDialog(e)}>
        <input type="text" bind:value={result} placeholder="Presentation Name" class="text-[25px] ml-1.25 text-[lightblue]"/>
        <button type="submit"><SquareArrowRightExitIcon/></button>
    </form>
</BaseDialog>