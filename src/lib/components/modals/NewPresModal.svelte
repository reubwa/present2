<script lang="ts">
	import { SquareArrowRightExitIcon } from "@lucide/svelte";
    import BaseDialog from "./BaseDialog.svelte";

	let {show = $bindable(), result = $bindable()} = $props();
	let dialog: HTMLDialogElement | undefined = $state();

</script>
<BaseDialog bind:dialog bind:show>
    <h1 class="text-white font-bold">New Presentation</h1>
    <form class="flex flex-row gap-2.5" onsubmit={(e) => show = false}>
        <input type="text" bind:value={result} placeholder="Presentation Name" class="text-[25px] ml-1.25"/>
        <button class="border-none rounded-[10px] text-white p-2.5" type="submit"><SquareArrowRightExitIcon/></button>
    </form>
</BaseDialog>
<style>
    button{
        background-color: var(46, 68, 68);
    }
    button:hover {
        cursor: pointer;
        background-color: rgb(66, 98, 98);
    }
</style>