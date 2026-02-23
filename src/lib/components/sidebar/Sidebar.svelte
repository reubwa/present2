<script lang="ts">
  let { children } = $props();
</script>
<div class="flex flex-col rounded-[10px] p-2.5 gap-2.5 text-white">
    {@render children?.()}
</div>
<style>
    div {
        background-color: rgb(26, 42, 42);
    }
</style>