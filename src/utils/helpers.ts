/**
 * Normalizes an array of numbers to a specified range.
 *
 * @param arr The array of numbers to be normalized.
 * @param minRange The minimum value of the desired range.
 * @param maxRange The maximum value of the desired range.
 * @returns A new array containing the normalized values.
 */
function normalizeArray(
  arr: number[],
  minRange: number,
  maxRange: number
): number[] {
  if (arr.length === 0) return [];

  let min = arr[0];
  let max = arr[0];

  // Find the minimum and maximum values in the array
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
    } else if (arr[i] > max) {
      max = arr[i];
    }
  }

  // Normalize each element in the array to the specified range
  const normalizedArr = arr.map((num) => {
    return minRange + ((num - min) / (max - min)) * (maxRange - minRange);
  });

  return normalizedArr;
}

/**
 * Generates a SVG path string based on the provided heights array, SVG dimensions, and closed flag.
 *
 * @param heights An array of numbers representing the heights (in percentage) at each point along the path.
 * @param svgWidth The width of the SVG container.
 * @param svgHeight The height of the SVG container.
 * @param closed Specifies whether the path should be closed (default: false).
 * @returns A SVG path string representing the generated path.
 */
function generatePath(
  heights: number[],
  svgWidth: number,
  svgHeight: number,
  closed: boolean = false
) {
  if (heights.length < 2) return "";

  const numPoints = heights.length;
  const step = svgWidth / (numPoints - 1);

  // Use an array to store the segments of the path string
  const pathSegments: string[] = [`M0 ${svgHeight * (1 - heights[0] / 100)}`];

  for (let i = 0; i < numPoints - 1; i++) {
    const x1 = i * step;
    const y1 = svgHeight * (1 - heights[i] / 100);
    const x2 = (i + 1) * step;
    const y2 = svgHeight * (1 - heights[i + 1] / 100);

    const cx1 = x1 + (x2 - x1) / 2;
    const cy1 = y1;
    const cx2 = x2 - (x2 - x1) / 2;
    const cy2 = y2;

    // Push each segment to the array
    pathSegments.push(`C${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}`);
  }

  if (closed) {
    pathSegments.push(`L${svgWidth} ${svgHeight}`); // br
    pathSegments.push(`L0 ${svgHeight}`); // bl
    pathSegments.push(`Z`); // close
  }

  // Join the segments to form the final path string
  return pathSegments.join(" ");
}

/**
 * Generates a SVG path string based on the provided heights array, SVG dimensions, and closed flag,
 * with heights normalized to a range of 2 to 99. so the path will not exceed the SVG container height
 *
 *
 * @param heights An array of numbers representing the heights (in percentage) at each point along the path.
 * @param svgWidth The width of the SVG container.
 * @param svgHeight The height of the SVG container.
 * @param closed Specifies whether the path should be closed (default: false).
 * @returns A SVG path string representing the generated path with normalized heights.
 */
export function generateNormalizedPath(
  heights: number[],
  svgWidth: number,
  svgHeight: number,
  closed: boolean = false
) {
  const normalizedHeights = normalizeArray(heights, 2, 99);
  return generatePath(normalizedHeights, svgWidth, svgHeight, closed);
}

export function processArrayInBatches(
  arr: number[],
  batchSize: number,
  callback: (batch: number[]) => void
) {
  for (let i = 0; i < arr.length; i += batchSize) {
    const batch = arr.slice(i, i + batchSize);
    callback(batch);
  }
}

export function simplifyData(points: number[], epsilon: number): number[] {
  // Check if the array has enough points to simplify
  if (points.length <= 2) {
    return points;
  }

  // Find the point with the maximum distance
  let maxDist = 0;
  let maxIndex = 0;
  const [start, end] = [points[0], points[points.length - 1]];

  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], start, end);
    if (dist > maxDist) {
      maxDist = dist;
      maxIndex = i;
    }
  }

  // Check if the maximum distance is greater than epsilon
  if (maxDist > epsilon) {
    // Recursively simplify the curve
    const left = simplifyData(points.slice(0, maxIndex + 1), epsilon);
    const right = simplifyData(points.slice(maxIndex), epsilon);
    return left.slice(0, -1).concat(right);
  } else {
    // Return the start and end points
    return [start, end];
  }
}

function perpendicularDistance(
  point: number,
  start: number,
  end: number
): number {
  // Calculate the perpendicular distance from the point to the line segment
  const [px, py] = [point, 0];
  const [sx, sy] = [start, 0];
  const [ex, ey] = [end, 0];
  const dx = ex - sx;
  const dy = ey - sy;
  const length = dx * dx + dy * dy;
  const u = ((px - sx) * dx + (py - sy) * dy) / length;
  const [x, y] = [sx + u * dx, sy + u * dy];
  const dx2 = x - px;
  const dy2 = y - py;
  return Math.sqrt(dx2 * dx2 + dy2 * dy2);
}

// Example usage
// const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const epsilon = 1; // Adjust the tolerance level as needed
// const simplifiedPoints = simplify(points, epsilon);
// console.log(simplifiedPoints);
