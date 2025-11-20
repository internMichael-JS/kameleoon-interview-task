import { LINE_SELECTOR, PERIOD_SELECTOR, VARIANT_SELECTOR } from "@/utils/constants";
import { ControlsPanel } from "../ControlPanel/ControlPanel";
import { useState } from "react";

export const ChartContainer = () => {
  const [selectedVariation, setSelectedVariation] = useState(VARIANT_SELECTOR.ALL);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_SELECTOR.DAY);
  const [selectedLine, setSelectedLine] = useState(LINE_SELECTOR.LINE);
  

  
    function setVariation(value: string): void {
      setSelectedVariation(value);
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
        variations={selectedVariation}
        period={selectedPeriod}
        line={selectedLine}
        onChangeVariation={setVariation}
        onChangePeriod={setPeriod}
        onChangeLine={setLine}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        resetZoom={resetZoom}
      />
    </div>
  );
};