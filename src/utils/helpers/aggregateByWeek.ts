import type { RawRow } from "./types";

export const aggregateByWeek = (data: RawRow[]) => {
  const variations = ["Original", "Variation A", "Variation B", "Variation C"];
  const weeks: Record<string, any> = {};

  data.forEach((item) => {
    const dateObj = new Date(item.date);
    const weekKey = getWeekKey(dateObj);

    if (!weeks[weekKey]) {
      weeks[weekKey] = {
        date: weekKey,
        start: item.date,
        end: item.date,
        values: {
          Original: [],
          "Variation A": [],
          "Variation B": [],
          "Variation C": []
        }
      };
    }

    if (item.date < weeks[weekKey].start) weeks[weekKey].start = item.date;
    if (item.date > weeks[weekKey].end) weeks[weekKey].end = item.date;

    variations.forEach((key) => {
      const val = item[key as keyof RawRow];
      if (typeof val === "number") {
        weeks[weekKey].values[key].push(val);
      }
    });
  });

  return Object.values(weeks).map((week: any) => {
    const payload = variations.map((key) => {
      const arr = week.values[key];
      if (!arr.length) {
        return { dataKey: key, value: null };
      }

      const avg = arr.reduce((a: number, b: number) => a + b, 0) / arr.length;
      return { dataKey: key, name: key, value: Number(avg.toFixed(2)) };
    });

    return {
      date: week.date,
      start: week.start,
      end: week.end,
      payload
    };
  });
};

export const getWeekKey = (date: Date): string => {
  const yearStart = new Date(date.getFullYear(), 0, 1);

  const pastDays = Math.floor(
    (date.getTime() - yearStart.getTime()) / 86400000
  );

  const weekNumber = Math.ceil((pastDays + yearStart.getDay() + 1) / 7);

  return `${date.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
};
