<script>
	import AddSlideModal from "$lib/components/modals/AddSlideModal.svelte";
	import ChangeThemeModal from "$lib/components/modals/ChangeThemeModal.svelte";
	import TransitionModal from "$lib/components/modals/TransitionModal.svelte";
	import TransitionSpeedModal from "$lib/components/modals/TransitionSpeedModal.svelte";
	import Toolbar from "$lib/components/toolbar/Toolbar.svelte";
    import ToolbarButton from "$lib/components/toolbar/ToolbarButton.svelte";
	import ToolbarGroup from "$lib/components/toolbar/ToolbarGroup.svelte";
	import { TransitionModes } from "$lib/structs";
    import { AccessibilityIcon } from "@lucide/svelte";

    let addSlideModalVisibility = $state(false);
	let addSlideResponse = $state("");

    let changeThemeModalVisibility = $state(false);
    let changeThemeResponse = $state("");

    let transitionModalVisibility = $state(false);
    let transitionResponse = $state("");

    let transitionModal = $state();

    let transitionSpeedModalVisibility = $state(false);
    let transitionSpeedResponse = $state("");
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Toolbar>
    <ToolbarGroup>
        <ToolbarButton caption="Add" icon={AccessibilityIcon} clickEvent={() => {addSlideModalVisibility = true}} iconSize="32"/>
        <ToolbarButton caption="Theme" icon={AccessibilityIcon} clickEvent={() => {changeThemeModalVisibility = true}} iconSize="32"/>
        <ToolbarButton caption="Test" icon={AccessibilityIcon} clickEvent={() => {}} iconSize="32"/>
    </ToolbarGroup>
    <ToolbarGroup>
        <ToolbarButton caption="Entry" icon={AccessibilityIcon} clickEvent={() => {
            transitionModal = TransitionModes.Entry;
            transitionModalVisibility = true;
        }} iconSize="32"/>
        <ToolbarButton caption="Exit" icon={AccessibilityIcon} clickEvent={() => {
            transitionModal = TransitionModes.Exit;
            transitionModalVisibility = true;
        }} iconSize="32"/>
        <ToolbarButton caption="Speed" icon={AccessibilityIcon} clickEvent={() => {transitionSpeedModalVisibility=true}} iconSize="32"/>
    </ToolbarGroup>
</Toolbar>

<AddSlideModal bind:show={addSlideModalVisibility} bind:result={addSlideResponse}/>
<ChangeThemeModal bind:show={changeThemeModalVisibility} bind:result={changeThemeResponse} />
<TransitionModal bind:show={transitionModalVisibility} bind:result={transitionResponse} bind:mode={transitionModal}/>
<TransitionSpeedModal bind:show={transitionSpeedModalVisibility} bind:result={transitionSpeedResponse} />

<p>{addSlideResponse}</p>
<p>{changeThemeResponse}</p>

<p>{transitionModal} transition: {transitionResponse}</p>

<p>{transitionSpeedResponse}</p>

<svelte:head>
    <style>
        body {
            background-color: rgb(12, 22, 22);
        }
    </style>
</svelte:head>