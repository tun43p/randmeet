<script lang="ts">
  import { generate } from "$lib/files";

  let files: FileList;
</script>

<input type="file" accept=".csv" title="Upload file" bind:files />

{#if files && files[0]}
  {#await generate(files[0])}
    <p>...loading</p>
  {:then results}
    {#if results.length !== 0}
      {#each results as result}
        <p>{result.a.name} - {result.b.name}</p>
      {/each}
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
