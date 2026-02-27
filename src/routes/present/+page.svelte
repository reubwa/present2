<script lang="ts">
	import { onMount } from 'svelte';
	import { currentPresentation } from '$lib/store.svelte';
	import { SlideTypes } from '$lib/structs.svelte';

	let shouldPrint = $state(false);

	// Use the currentPresentation directly with proper defaults
	let presentation = $state(currentPresentation);

	onMount(async () => {
		console.log('=== Present page mounted ===');
		console.log('Raw currentPresentation:', currentPresentation);
		console.log('Raw currentPresentation.title:', currentPresentation.title);
		console.log('Raw currentPresentation.theme:', currentPresentation.theme);
		console.log('Raw currentPresentation.slides length:', currentPresentation.slides.length);

		// Update presentation reference
		presentation = currentPresentation;

		console.log('Presentation title:', presentation?.title);
		console.log('Presentation theme:', presentation?.theme);
		console.log('Slides length:', presentation?.slides?.length || 0);

		if (presentation?.slides?.length > 0) {
			console.log('First slide title:', presentation.slides[0].title);
			console.log('First slide content type:', presentation.slides[0].content.type);
		}

		try {
			// Wait longer for DOM to be fully ready
			await new Promise(resolve => setTimeout(resolve, 300));

			// Import Reveal.js and plugins only on the client
			const Reveal = (await import('reveal.js')).default;
			const RevealMarkdown = (await import('reveal.js/plugin/markdown/markdown')).default;
			const RevealHighlight = (await import('reveal.js/plugin/highlight/highlight')).default;

			// Try to import math plugin, but continue if it fails
			let mathPlugin = null;
			try {
				const RevealMath = await import('reveal.js/plugin/math/math');
				mathPlugin = RevealMath.default?.KaTeX || RevealMath.default;
			} catch (mathError) {
				console.warn('Math plugin could not be loaded:', mathError);
			}

			const params = new URL(document.location.toString());
			const URLSearchParams = params.searchParams;

			const isPrintMode = URLSearchParams.has('print-pdf');
			if (isPrintMode) {
				shouldPrint = true;
			}

			// Initialize with available plugins
			const plugins = [RevealMarkdown, RevealHighlight];
			if (mathPlugin) {
				plugins.push(mathPlugin);
			}

			console.log('Creating Reveal instance with', presentation?.slides?.length || 0, 'slides');
			const deckConfig = {
				plugins: plugins,
				center: true,
				width: '100%',
				height: '100%',
				margin: 0.05,
				minScale: 0.2,
				maxScale: 2.0,
				// Disable features that might cause issues
				touch: true,
				keyboard: true
			};

			// Add print-specific config if needed
			if (isPrintMode) {
				Object.assign(deckConfig, {
					width: 960,
					height: 700
				});
			}

			console.log('Initializing Reveal...');
			const deck = new Reveal(deckConfig);

			// Don't await initialize if it causes issues
			const initPromise = deck.initialize();

			// Set a timeout to prevent infinite waiting
			const timeoutPromise = new Promise(resolve => setTimeout(resolve, 2000));
			await Promise.race([initPromise, timeoutPromise]);

			console.log('Reveal.js initialized');

			// Wait a bit for DOM processing
			await new Promise(resolve => setTimeout(resolve, 300));

			// Don't call sync or slide if they cause stack overflow
			console.log('Ready to present');

			// If in print mode, trigger print dialog after everything is loaded
			if (isPrintMode) {
				console.log('Print mode detected, preparing to print...');
				await new Promise(resolve => setTimeout(resolve, 2000));
				console.log('Triggering print dialog...');
				window.print();
			}

			console.log('=== End Present page mount ===');
		} catch (error) {
			console.error('Error initializing Reveal.js:', error);
			// Don't show alert for stack overflow as it's too spammy
			if (!(error instanceof RangeError)) {
				alert('Failed to initialize presentation viewer: ' + (error instanceof Error ? error.message : 'Unknown error'));
			}
		}
	});
</script>
<svelte:head>
	<link rel="stylesheet" href="/node_modules/reveal.js/dist/reveal.css">
	{#if presentation}
		<link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/{(presentation.theme || 'white').toLowerCase()}.css" id="theme">
	{:else}
		<link rel="stylesheet" href="/node_modules/reveal.js/dist/theme/white.css" id="theme">
	{/if}
	<link rel="stylesheet" href="/node_modules/reveal.js/plugin/highlight/monokai.css">
	{#if shouldPrint}
		<link rel="stylesheet" href="/node_modules/reveal.js/dist/print/pdf.css" type="text/css" media="print">
		<style>
			/* Additional print styles */
			@media print {
				body {
					margin: 0;
					padding: 0;
				}
				.reveal .slides section {
					page-break-after: always;
					page-break-inside: avoid;
				}
			}
		</style>
	{/if}
</svelte:head>

<div class="reveal">
	<div class="slides">
		{#if presentation && presentation.slides}
			{#each presentation.slides as slide, i (i)}
				{#if slide.content.type === SlideTypes.TitleSubtitle}
					<section data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}">
						<h1>{slide.title}</h1>
						<p>{slide.content.strings[0] || ''}</p>
					</section>
				{:else if slide.content.type === SlideTypes.TextBullets}
					<section data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}">
						<h2>{slide.title}</h2>
						<ul>
							{#each slide.content.strings as bullet, j (j)}
								<li>{bullet}</li>
							{/each}
						</ul>
					</section>
				{:else if slide.content.type === SlideTypes.Markdown}
					<section data-markdown data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html '<' + 'script type="text/template">' + (slide.content.strings[0] || '') + '<' + '/script>'}
					</section>
				{:else if slide.content.type === SlideTypes.Image}
					<section data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}" data-background-image="{slide.content.strings[0] || ''}">
						<h2>{slide.title}</h2>
					</section>
				{:else if slide.content.type === SlideTypes.Maths}
					<section data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}">
						<h2>{slide.title}</h2>
						<div class="math-content">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html slide.content.strings[0] || ''}
						</div>
					</section>
				{:else if slide.content.type === SlideTypes.Code}
					<section data-transition="{(slide.entryTransition || 'None').toLowerCase()}" data-transition-out="{(slide.exitTransition || 'None').toLowerCase()}" data-transition-speed="{(slide.transitionSpeeds || 'Default').toLowerCase()}">
						<h2>{slide.title}</h2>
						<pre><code class="language-javascript">{slide.content.strings[0] || ''}</code></pre>
					</section>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	:global(html) {
		height: 100%;
	}

	:global(body) {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	:global(.reveal) {
		height: 100vh;
	}

	:global(.reveal h1) {
		font-size: 3.77em;
	}

	:global(.reveal h2) {
		font-size: 2.11em;
	}

	:global(.reveal pre) {
		width: 100%;
		font-size: 0.55em;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
	}

	:global(.reveal code) {
		padding: 2px 6px;
		background: rgba(255, 255, 255, 0.1);
	}

	:global(.reveal section) {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	:global(.reveal ul) {
		width: 100%;
		text-align: left;
	}

	:global(.math-content) {
		font-size: 1.5em;
		margin-top: 1em;
	}
</style>

