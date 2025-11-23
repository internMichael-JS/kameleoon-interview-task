import type { ChartRow } from "@/utils/types";

export function getDomain(
  data: ChartRow[],
  selectedVariation: string,
  zoom: number,
): [number, number] {
  if (!data.length) return [0, 0];

  let keys: string[] = [];

  if (selectedVariation === 'All variations selected') {
    keys = Object.keys(data[0]).filter(k => {
      const key = k as keyof ChartRow;
      return typeof data[0][key] === 'number';
    });
  } else {
    keys = [selectedVariation];
  }

  const values: number[] = [];

  for (const row of data) {
    for (const key of keys) {
      const val = row[key as keyof ChartRow];
      if (typeof val === 'number' && !isNaN(val)) {
        values.push(val);
      }
    }
  }

  if (!values.length) {
    return [0, 0];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const mid = (min + max) / 2;
  const half = range / 2 / zoom;

  return [Math.round(Math.max(mid - half, 0) - 2), Math.round(mid + half + 2)];
}
