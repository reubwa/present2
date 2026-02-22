<script lang="ts">
  let { children } = $props();
</script>
<div class="flex flex-row gap-3.75 bg-[rgb(26, 42, 42)] rounded-[10px] p-1.25 text-white">
    {@render children?.()}
</div>