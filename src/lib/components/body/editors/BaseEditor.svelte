<script lang="ts">
  let { children } = $props();
</script>
<div class="rounded-[10px] min-w-[75%] max-w-[75%] h-full p-2.5">
    {@render children?.()}
</div>
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>