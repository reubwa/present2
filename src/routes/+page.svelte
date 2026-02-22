<script>
	import AddSlideModal from "$lib/components/AddSlideModal.svelte";
	import Toolbar from "$lib/components/Toolbar.svelte";
    import ToolbarButton from "$lib/components/ToolbarButton.svelte";
	import ToolbarGroup from "$lib/components/ToolbarGroup.svelte";
    import { AccessibilityIcon } from "@lucide/svelte";

    let ThumbuploadModalVisibility = $state(false);
	let res = $state("");
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Toolbar>
    <ToolbarGroup>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {ThumbuploadModalVisibility = true}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={ThumbuploadModalVisibility} bind:result={res}/>

<p>{res}</p>

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>