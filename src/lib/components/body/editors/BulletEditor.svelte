<script lang="ts">
	import { arrayMoveMutable } from 'array-move';

	let {strings = $bindable([]), title = $bindable()} = $props();
	import { MoveUp, MoveDown, Trash2, CirclePlus } from '@lucide/svelte';
</script>
<div class="flex flex-col gap-2.5">
	<input placeholder="Title" class="text-[100px] text-white text-left" bind:value={title}/>
	{#each strings as bullet, i (i)}
		{#if strings.length === 1}
			<div class="flex flex-row gap-2.5 items-center">
				<p>•</p>
				<input class="text-[30px] w-full" bind:value={strings[i]}/>
				<button title="Delete" onclick={()=>{
						strings.splice(i,1);
					}}><Trash2/></button>
			</div>
		{:else}
			{#if i !== strings.length}
				<div class="flex flex-row gap-2.5 items-center">
					<p>•</p>
					<input class="text-[30px] w-full" bind:value={strings[i]}/>
					<button title="Move Up" onclick={()=>{
						arrayMoveMutable(strings, i, i-1)
					}}><MoveUp/></button>
					<button title="Move Down" onclick={()=>{
						arrayMoveMutable(strings, i, i+1)
					}}><MoveDown/></button>
					<button title="Delete" onclick={()=>{
						strings.splice(i,1);
					}}><Trash2/></button>
				</div>
				{:else}
				<div class="flex flex-row gap-2.5 items-center">
					<p>•</p>
					<input class="text-[30px] w-full" bind:value={strings[i]}/>
					<button title="Move Up" onclick={()=>{
						arrayMoveMutable(strings, i, i-1)
					}}><MoveUp/></button>
					<button title="Delete" onclick={()=>{
						strings.splice(i,1);
					}}><Trash2/></button>
				</div>
			{/if}
		{/if}
	{/each}
	<button title="Add" onclick={()=>{
		strings.push("");
	}}><CirclePlus/></button>
</div>
<style>
    input{
        background: none;
        border: none;
        margin:10px;
    }
</style>