<script lang="ts">
	let {title = $bindable(), subtitle = $bindable()} = $props();
</script>
<div class="flex flex-col gap-2.5">
	<input placeholder="Title" class="text-[100px] text-white text-center" bind:value={title}/>
	<input placeholder="Subtitle" class="text-[50px] text-white text-center" bind:value={subtitle}/>
</div>
<style>
    input{
        background: none;
        border: none;
        margin:10px;
    }
</style>