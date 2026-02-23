<script lang="ts">
  let { children } = $props();
</script>
<div class="flex flex-row gap-2.5 mt-5 ml-px flex-wrap">
    {@render children?.()}
</div>