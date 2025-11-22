import { useMemo } from 'react';
import dataRaw from '../data/data.json';
import type { RawRow } from '@/utils/types';

type Variation = {
  id?: number;
  name: string;
};

type RawFile = {
  variations: Variation[];
  data: RawRow[];
};

export function useChartData() {
  const rawData = dataRaw as RawFile;

  const { variations, chartData } = useMemo(() => {
    const variationMap = rawData.variations.map(v => ({
      value: v.id ? String(v.id) : '0',
      label: v.name,
    }));

    const transformed = rawData.data.map(row => {
      const obj: any= { date: row.date };

      variationMap.forEach(v => {
        const visits = row.visits[v.value] ?? 0;
        const conversions = row.conversions[v.value] ?? 0;

        obj[v.label] =
          visits > 0 ? (conversions / visits) * 100 : null; 
      });

      return obj;
    });

    return {
      variations: variationMap,
      chartData: transformed,
    };
  }, []);

  return {
    variations,
    chartData,
  };
}
