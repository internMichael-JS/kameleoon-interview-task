import { FetchIcon, MinusIcon, PlusIcon } from '@/assets/icons';
import { IconButton } from '../../../utils/IconButton/IconButton';
import styles from './ZoomControls.module.css';

type ZoomControlsProps = {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
};

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomIn,
  zoomOut,
  reset,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <IconButton
          icon={<MinusIcon className={styles.element} />}
          onClick={zoomOut}
        />
        <IconButton
          icon={<PlusIcon className={styles.element} />}
          onClick={zoomIn}
        />
      </div>

      <IconButton
        icon={<FetchIcon className={styles.element} />}
        onClick={reset}
      />
    </div>
  );
};
