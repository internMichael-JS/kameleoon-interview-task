import { variantColors } from '@/utils/variantsColors';
import styles from './CustomTooltip.module.css';
import { CalendarIcon, CupIcon } from '@/assets/icons';
import type {
  CustomTooltipPayload,
  ProcessedData,
  RawRow,
} from '@/utils/types';

type CustomTooltipProps = {
  active?: boolean;
  payload?: CustomTooltipPayload[];
  label?: string;
  processedData: RawRow[] | ProcessedData[];
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload = [],
  label = '',
  processedData,
}) => {
  if (!active || !payload || !payload.length) return null;

  const row = processedData.find(item => {
    if (!('start' in item)) return false;

    const point = new Date(label).getTime();
    const start = new Date(item.start).getTime();
    const end = new Date(item.end).getTime();

    return point >= start && point <= end;
  });

  const range =
    row && 'start' in row
      ? `${new Intl.DateTimeFormat('en-GB').format(
          new Date(row.start),
        )} - ${new Intl.DateTimeFormat('en-GB').format(new Date(row.end))}`
      : new Intl.DateTimeFormat('en-GB').format(new Date(label));

  const weekPayload = row && 'payload' in row ? row.payload : null;

  const sourcePayload = weekPayload ?? payload;

  const newPayload = [...sourcePayload].sort(
    (a, b) => Number(b.value) - Number(a.value),
  );

  return (
    <div className={styles.card}>
      <div className={styles.date}>
        <CalendarIcon className={styles.calendarIcon} />
        {range}
      </div>

      <div className={styles.list}>
        {newPayload.map((entry, index) => {
          const name = entry.dataKey || entry.name;
          const value = entry.value;
          const color = variantColors[name] || variantColors[0];

          return (
            <div className={styles.row} key={name}>
              <span className={styles.dot} style={{ backgroundColor: color }} />
              <span className={styles.name}>{name}</span>
              {index === 0 && newPayload.length > 1 && (
                <CupIcon className={styles.cupIcon} />
              )}
              <span className={styles.value}>
                {value !== null ? value.toFixed(2) + '%' : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
