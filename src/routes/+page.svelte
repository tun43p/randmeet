<script lang="ts">
  import { generate } from "../app";
  import "../app.css";

  let files: FileList;
</script>

<header id="header" class="header">
  <p id="logo" class="logo">Randmeet</p>
</header>

<main class="main">
  <h1 id="title" class="title">Generate randomly your meetings</h1>

  <div id="button" class="button">
    <label id="label" for="file">Upload your CSV file</label>
    <input
      type="file"
      accept=".csv"
      id="file"
      style="display:none;"
      bind:files
    />
  </div>

  <div class="content">
    {#if files && files[0]}
      {#await generate(files[0])}
        <p class="loader">...loading</p>
      {:then results}
        {#if results.length !== 0}
          <table class="table">
            <tr>
              <th>A</th>
              <th>B</th>
            </tr>
            {#each results as result}
              <tr>
                <td>{result.a.name}</td>
                <td> {result.b.name}</td>
              </tr>
            {/each}
          </table>
        {/if}
      {:catch error}
        <p class="error">{error.message}</p>
      {/await}
    {/if}
  </div>
</main>
