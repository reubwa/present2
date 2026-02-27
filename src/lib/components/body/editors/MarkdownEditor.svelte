<script lang="ts">
	let {content = $bindable()} = $props();
</script>
<div class="flex flex-col gap-2.5">
	<textarea placeholder="Markdown" bind:value={content} class="bg-none outline-none text-white w-full h-100 text-[30px] resize-none pl-3.75 align-text-left"></textarea>
</div>