import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  Tooltip,
  ComposedChart,
} from 'recharts';

import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import { variantColors } from '@/utils/variantsColors';
import { formatMonth } from '@/utils/helpers/formatMonth';

import { type Option, type ProcessedData, type RawRow } from '@/utils/types';
import { getDomain } from '@/utils/helpers/getDomain';
import { useCallback, useMemo } from 'react';
import { aggregateByWeek } from '@/utils/helpers/aggregateByWeek';
import { PERIOD_SELECTOR } from '@/utils/constants';
import { IconButton } from '@/utils/IconButton/IconButton';
import { SaveIcon } from '@/assets/icons';

import styles from './ChartPanel.module.css';
import { useGenerateImage } from 'recharts-to-png';
import FileSaver from 'file-saver';

interface ChartProps {
  data: RawRow[];
  selectedVariation: string;
  lineStyle: string;
  variations: Option[];
  selectedPeriod: string;
  zoom: number;
}

export const Chart = ({
  data,
  selectedVariation,
  lineStyle,
  variations,
  selectedPeriod,
  zoom,
}: ChartProps) => {
  const [getDivJpeg, { ref: chartRef }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: 'image/png',
  });
  const handleDivDownload = useCallback(async () => {
    const jpeg = await getDivJpeg();
    if (jpeg) {
      FileSaver.saveAs(jpeg, 'image.png');
    }
  }, [getDivJpeg]);

  if (!data.length) return null;

  const renderLine = (lineStyle: string, selectedVariation: string) => {
    const color = variantColors[selectedVariation] || variantColors[0];
    switch (lineStyle) {
      case 'LINE':
        return (
          <Line
            key={selectedVariation}
            type="linear"
            dataKey={selectedVariation}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            connectNulls
          />
        );

      case 'SMOOTH':
        return (
          <Line
            key={selectedVariation}
            type="monotone"
            dataKey={selectedVariation}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            connectNulls
          />
        );

      case 'AREA':
        return (
          <Area
            key={selectedVariation}
            type="monotone"
            dataKey={selectedVariation}
            stroke={color}
            fill={color}
            fillOpacity={0.55}
            strokeWidth={2}
            connectNulls
            isAnimationActive={false}
            z={100}
          />
        );

      default:
        return null;
    }
  };

  const processedData = useMemo(() => {
    if (selectedPeriod !== Object.keys(PERIOD_SELECTOR)[0])
      return aggregateByWeek(data) as ProcessedData[];
    return data;
  }, [data, selectedPeriod]);

  console.log(data);

  return (
    <>
      <div ref={chartRef}>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data} style={{ margin: 0 }}>
            <XAxis
              dataKey="date"
              tickFormatter={value => formatMonth(value)}
              tickLine={false}
              allowDataOverflow={true}
              domain={['2025-01-02', '2025-01-29']}
            />

            <YAxis
              type="number"
              allowDataOverflow={true}
              tickFormatter={v => (v === 0 ? '0' : `${v}%`)}
              tickLine={false}
              domain={getDomain(data, selectedVariation, zoom)}
            />

            <Tooltip
              content={<CustomTooltip processedData={processedData} />}
              cursor={{ strokeDasharray: '4 4' }}
            />
            {selectedVariation !== 'All variations selected'
              ? renderLine(lineStyle, selectedVariation)
              : variations.map(el => renderLine(lineStyle, el.label))}

            <CartesianGrid
              strokeDasharray="3 3"
              fill="transparent"
              fillOpacity={0}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.buttonWrap}>
        <span>{'You can save this as PNG image ->'}</span>
        <IconButton
          icon={<SaveIcon className={styles.element} title="Export to PNG" />}
          onClick={handleDivDownload}
        />
      </div>
    </>
  );
};
