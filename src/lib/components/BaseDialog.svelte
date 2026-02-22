<script lang="ts">
    import type { Snippet } from "svelte";

	let {
		show = $bindable(),
		dialog = $bindable(),
		children
	}: {
		show: boolean,
		dialog? : HTMLDialogElement,
		children : Snippet
	} = $props();

	$effect(() => {
		if (show) dialog?.showModal();
		else dialog?.close();
	});
</script>

<dialog
	class="border-none"
	id="main"
	bind:this={dialog}
	onclose={() => (show = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
>
	{@render children?.()}
</dialog>

<style>
	#main {
		flex-direction: column;
		gap: 8px;
		margin: auto;
		position: fixed;
		border-radius: 0.2em;
		border: none;

		padding: 16px;
		background-color: rgb(26, 42, 42);
		font-family: "Noto Sans", sans-serif;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.3);
		}
		&[open] {
			display: flex;

			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
			&::backdrop {
				animation: fade 0.2s ease-out;
			}
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.98);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>