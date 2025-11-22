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
import { formatMonth } from '@/utils/formatMonth';

import { type Option, type ProcessedData, type RawRow } from '@/utils/types'
import { getDomain } from '@/utils/getDomain';
import { useMemo } from 'react';
import { aggregateByWeek } from '@/utils/aggregateByWeek';
import { PERIOD_SELECTOR } from '@/utils/constants';

interface ChartProps {
    data: RawRow[];
    selectedVariation: string;
    lineStyle: string;
    variations: Option[];
    selectedPeriod: string;
}

export const Chart = ({
    data,
    selectedVariation,
    lineStyle,
    variations,
    selectedPeriod
}: ChartProps) => {
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
        if (selectedPeriod !== Object.keys(PERIOD_SELECTOR)[0]) return aggregateByWeek(data) as ProcessedData[];
        return data;
    }, [data, selectedPeriod]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
                <XAxis dataKey="date"
                    tickFormatter={(value) =>  formatMonth(value)}
                    tickLine={false}
                    domain={getDomain(data, selectedVariation)}
                />

                <YAxis
                    tickFormatter={(v) => (v === 0 ? "0" : `${v}%`)}
                    domain={['auto', 'auto']}
                    tickLine={false}
                />

                <Tooltip content={<CustomTooltip processedData={processedData} />} cursor={{ strokeDasharray: '4 4' }} />
                {selectedVariation !== 'All variations selected'
                    ? renderLine(lineStyle, selectedVariation)
                    : variations.map((el) => renderLine(lineStyle, el.label))}

                <CartesianGrid
                    strokeDasharray="3 3"
                    fill="transparent"
                    fillOpacity={0}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};
