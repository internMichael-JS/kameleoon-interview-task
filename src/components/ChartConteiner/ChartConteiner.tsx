import { LINE_SELECTOR, PERIOD_SELECTOR } from "@/utils/constants";
import { ControlsPanel } from "../ControlPanel/ControlPanel";
import { useState } from "react";
import { Chart } from "../ChartPanel/ChartPanel";
import { useChartData } from "@/hooks/useChartData";

export const ChartContainer = () => {
  const { variations, chartData } = useChartData();

  const variationsWithAll = [
  { label: "All variations selected", value: "All variations selected" },
  ...variations,
];

  const [selectedVariation, setSelectedVariation] = useState(variationsWithAll[0].label);
  const [selectedPeriod, setSelectedPeriod] = useState(Object.keys(PERIOD_SELECTOR)[0]);
  const [selectedLine, setSelectedLine] = useState(Object.keys(LINE_SELECTOR)[0]);

  function setVariation(value: string): void {
    setSelectedVariation(variationsWithAll.find((el) => el.value === value)?.label as string);
  }

  function setPeriod(value: string): void {
    setSelectedPeriod(value);
  }

  function setLine(value: string): void {
    setSelectedLine(value);
  }

  function zoomIn(): void {
    throw new Error('Function not implemented.');
  }

  function zoomOut(): void {
    throw new Error('Function not implemented.');
  }

  function resetZoom(): void {
    throw new Error('Function not implemented.');
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
      />
    </div>
  );
};