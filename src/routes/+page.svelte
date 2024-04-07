<script lang="ts">
  import AreaChart from "$lib/area-chart.svelte";

  const data = [100, 1000, 200, 500, 1500];
</script>

<div class="container">
  <h1>Area chart</h1>
  <AreaChart {data} width={800} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
