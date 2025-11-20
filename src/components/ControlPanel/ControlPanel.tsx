import { getSelectFieldOptions } from "@/utils/getSelectFieldOptions";
import { SelectField } from "./SelectField/SelectField";
import { ZoomControls } from "./ZoomControls/ZoomControls";
import { LINE_SELECTOR, PERIOD_SELECTOR, VARIANT_SELECTOR } from "@/utils/constants";

import styles from './ControlPanel.module.css'

type ControlsPanelProps = {
    variations: string;
    period: string;
    line: string;
    onChangeVariation: (value: string) => void;
    onChangePeriod:(value: string) => void;
    onChangeLine:(value: string) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
    variations,
    period,
    line,
    onChangeVariation,
    onChangePeriod,
    onChangeLine,
    zoomIn,
    zoomOut,
    resetZoom,
}) => {
    return (
        <div className={styles.panel}>
            <div className={styles.left}>
                <SelectField
                    value={variations}
                    onChange={onChangeVariation}
                    options={getSelectFieldOptions.call(null, VARIANT_SELECTOR)}
                />

                <SelectField
                    value={period}
                    onChange={onChangePeriod}
                    options={getSelectFieldOptions.call(null, PERIOD_SELECTOR)}
                />
            </div>

            <div className={styles.right}>
                <SelectField
                    value={line}
                    onChange={onChangeLine}
                    options={getSelectFieldOptions.call(null, LINE_SELECTOR)}
                />

                <ZoomControls
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    reset={resetZoom}
                />
            </div>
        </div>
    );
};