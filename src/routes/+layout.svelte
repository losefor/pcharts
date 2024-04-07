<div class="center">
  <slot />
</div>

<style>
  :global(*) {
    padding: 0;
    margin: 0;
  }

  :global(body) {
    font-family: Arial, sans-serif;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
