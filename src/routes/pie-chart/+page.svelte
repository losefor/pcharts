<script lang="ts">
  import PieChart from "$lib/pie-chart.svelte";

  const data = [
    {
      name: "Paid bills",
      value: 20,
      color: "#facc15",
    },
    {
      name: "Unpaid bills",
      value: 10,
      color: "#fefce8",
    },
  ];
</script>

<div class="container">
  <h1 style="margin-bottom: 20px;">Pie chart</h1>
  <PieChart {data} count={75} />
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
