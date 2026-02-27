<script lang="ts">
	let {content = $bindable(), title = $bindable()} = $props();
</script>
<div class="flex flex-col gap-2.5">
	<input placeholder="Title" class="text-[100px] text-white text-left" bind:value={title}/>
	<textarea placeholder="LaTeX" bind:value={content} class="bg-none outline-none text-white w-full h-75 text-[30px] resize-none pl-3.75 align-text-left"></textarea>
</div>
<style>
    input{
        background: none;
        border: none;
        margin:10px;
    }
</style>