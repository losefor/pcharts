<script lang="ts">
  interface DataProps {
    name: string;
    value: number;
    color: string;
    count?: number;
    startValue?: number;
    endValue?: number;
    startPercent?: number;
    endPercent?: number;
    startDegrees?: number;
    endDegrees?: number;
  }

  export let data: DataProps[];
  export let count: number = 0;

  // Calculate the total of the values in the data array
  const totalValue = data.reduce((a, b) => a + b.value, 0);

  // Convert the value to a percentage
  const convertToPercent = (num: number) =>
    Math.round((num / totalValue) * 100);

  // Convert the percentage to degrees
  const convertToDegrees = (num: number) => Math.round((num / 100) * 360);

  const conicGradientValue = data
    .reduce((items: DataProps[], item, index, array) => {
      const count = item.count || 0;
      const startValue = array[index - 1]?.count ? array[index - 1].count : 0;
      const endValue = count + item.value;

      const startPercent = convertToPercent(startValue!);
      const endPercent = convertToPercent(endValue);

      const startDegrees = convertToDegrees(startPercent);
      const endDegrees = convertToDegrees(endPercent);

      items.push({
        ...item,
        count,
        startValue,
        endValue,
        startPercent,
        endPercent,
        startDegrees,
        endDegrees,
      });

      return items;
    }, [])
    .map((chart: any) => {
      const { color, startDegrees, endDegrees } = chart;
      return `${color} ${startDegrees}deg ${endDegrees}deg`;
    })
    .join();
</script>

<div class="container">
  <svg
    viewBox="0 0 100 100"
    style="width: 100%;height: 100%;border-radius: 50%;"
  >
    <foreignObject x="0" y="0" width="100" height="100" clip-path="url(#hole)"
      ><div
        style="width: 100%;height: 100%;background: conic-gradient({conicGradientValue});"
      ></div></foreignObject
    >
  </svg>
</div>

<style>
  .container {
    /* flex flex-col grow p-10 relative */
    display: flex;
    flex-direction: column;
    /* flex-grow: 1; */
    position: relative;
    height: fit-content;
  }

  .container__text {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
