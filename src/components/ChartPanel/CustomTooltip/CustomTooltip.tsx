import { VARIANT_COLORS } from '@/utils/constants';
import styles from './CustomTooltip.module.css';
import { CalendarIcon, CupIcon } from '@/assets/icons';
import type {
  ChartRow,
  CustomTooltipPayload,
  ProcessedData,
} from '@/utils/types';

type CustomTooltipProps = {
  processedData: ChartRow[] | ProcessedData[];
  active?: boolean;
  payload?: CustomTooltipPayload[];
  label?: string;
};

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload = [],
  label = '',
  processedData,
}) => {
  if (!active || !payload || !payload.length) return null;

  const row = processedData.find(item => {
    if (item.start === null || item.end === null) return false;

    const point = new Date(label).getTime();
    const start = new Date(item.start).getTime();
    const end = new Date(item.end).getTime();

    return point >= start && point <= end;
  });

  const range =
    row && row.start && row.end
      ? `${new Intl.DateTimeFormat('en-GB').format(
        new Date(row.start),
      )} - ${new Intl.DateTimeFormat('en-GB').format(new Date(row.end))}`
      : new Intl.DateTimeFormat('en-GB').format(new Date(label));


  const sourcePayload = row?.payload ?? payload;
  if (!Array.isArray(sourcePayload)) {
    return []
  }
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
          const color = VARIANT_COLORS[name] || VARIANT_COLORS[0];

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
