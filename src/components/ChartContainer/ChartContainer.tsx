import { LINE_SELECTOR, PERIOD_SELECTOR, VARIANT_SELECTOR } from '@/utils/constants';
import { ControlsPanel } from '../ControlPanel/ControlPanel';
import { useState } from 'react';
import { Chart } from '../ChartPanel/ChartPanel';
import { useChartData } from '@/hooks/useChartData';

export const ChartContainer = () => {
  const { variations, chartData } = useChartData();
  const variationsWithAll = [
    { label: VARIANT_SELECTOR.ALL, value: VARIANT_SELECTOR.ALL },
    ...variations,
  ];

  const [selectedVariation, setSelectedVariation] = useState(
    variationsWithAll[0].label,
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    Object.keys(PERIOD_SELECTOR)[0],
  );
  const [selectedLine, setSelectedLine] = useState(
    Object.keys(LINE_SELECTOR)[0],
  );
  const [zoom, setZoom] = useState(1);

  function setVariation(value: string): void {
    setSelectedVariation(
      variationsWithAll.find(el => el.value === value)?.label as string,
    );
  }

  function setPeriod(value: string): void {
    setSelectedPeriod(value);
  }

  function setLine(value: string): void {
    setSelectedLine(value);
  }

  function zoomIn(): void {
    setZoom(z => Math.min(4, z + 0.1));
  }

  function zoomOut(): void {
    setZoom(z => Math.max(0, z - 0.1));
  }

  function resetZoom(): void {
    setZoom(1);
  }

  return (
    <div>
      <ControlsPanel
        selectedVariation={selectedVariation}
        variations={variationsWithAll}
        period={selectedPeriod}
        line={selectedLine}
        onChangeVariation={setVariation}
        onChangePeriod={setPeriod}
        onChangeLine={setLine}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
      />
      <Chart
        data={chartData}
        variations={variations}
        selectedVariation={selectedVariation}
        lineStyle={selectedLine}
        selectedPeriod={selectedPeriod}
        zoom={zoom}
      />
    </div>
  );
};
