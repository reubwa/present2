<script lang="ts">
  let { children } = $props();
</script>
<div class="flex flex-row gap-2.5 flex-wrap ml-1.25 mt-1.25">
    {@render children?.()}
</div>