<script lang="ts">
	let {url = $bindable(), title = $bindable()} = $props();
</script>
<div class="flex flex-col gap-2.5">
	<input placeholder="Title" class="text-[100px] text-white text-left" bind:value={title}/>
	<input placeholder="Image URL" class="text-[25px] text-white text-left" bind:value={url}/>
</div>
<style>
    input{
        background: none;
        border: none;
        margin:10px;
    }
</style>