<script lang="ts">
  import { generateNormalizedPath } from "../utils/helpers";

  export let width = 200;
  export let height = 200;
  export let data: number[] = [];
</script>

<svg {width} {height} xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="120%">
      <stop offset="0%" stop-color="#378fe9" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>
  <path
    class="area"
    fill="url(#grad1)"
    d={generateNormalizedPath(data, width, height, true)}
  />
  <path
    class="outline"
    d={generateNormalizedPath(data, width, height, false)}
  />
</svg>

<style>
  svg .outline {
    stroke: #378fe9;
    stroke-width: 5px;
    stroke-dashoffset: calc(1ch + 4px);
    fill: transparent;
  }

  svg .area {
    stroke-width: 9px;
  }

  @keyframes slide {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
