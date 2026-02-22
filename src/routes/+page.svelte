<script>
	import AddSlideModal from "$lib/components/modals/AddSlideModal.svelte";
	import ChangeThemeModal from "$lib/components/modals/ChangeThemeModal.svelte";
	import Toolbar from "$lib/components/toolbar/Toolbar.svelte";
    import ToolbarButton from "$lib/components/toolbar/ToolbarButton.svelte";
	import ToolbarGroup from "$lib/components/toolbar/ToolbarGroup.svelte";
    import { AccessibilityIcon } from "@lucide/svelte";

    let addSlideModalVisibility = $state(false);
	let addSlideResponse = $state("");

    let changeThemeModalVisibility = $state(false);
    let changeThemeResponse = $state("");
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Toolbar>
    <ToolbarGroup>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {addSlideModalVisibility = true}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {changeThemeModalVisibility = true}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={addSlideModalVisibility} bind:result={addSlideResponse}/>
<ChangeThemeModal bind:show={changeThemeModalVisibility} bind:result={changeThemeResponse} />

<p>{addSlideResponse}</p>
<p>{changeThemeResponse}</p>

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>