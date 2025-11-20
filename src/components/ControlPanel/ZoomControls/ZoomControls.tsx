import { FetchIcon, MinusIcon, PlusIcon } from "@/assets/icons";
import { IconButton } from "../IconButton/IconButton";
import styles from "./ZoomControls.module.css";

type ZoomControlsProps = {
zoomIn: () => void;
zoomOut: () => void;
reset: () => void;
};

export const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomIn, zoomOut, reset }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <IconButton icon={<MinusIcon />} onClick={zoomOut} />
        <IconButton icon={<PlusIcon />} onClick={zoomIn} />
      </div>

      <IconButton icon={<FetchIcon />} onClick={reset} />
    </div>
  );
};
