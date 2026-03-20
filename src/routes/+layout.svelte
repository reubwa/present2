<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href="{base}/favicon.ico" /></svelte:head>
{@render children()}