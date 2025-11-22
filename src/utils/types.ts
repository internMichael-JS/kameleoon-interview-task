export type Option = {
  label: string;
  value: string;
}

export type RawRow = {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
};

export type ProcessedData = {
  date: string;
  start: string;
  end: string;
  payload: {
    dataKey: string;
    name: string;
    value: number | null;
  }[];
}

export type CustomTooltipPayload = {
  color?: string;
  dataKey: string;
  fill?: string;
  hide?: boolean;
  name: string;
  nameKey?: string | undefined;
  payload?: Record<string, string | number>
  stroke?: string;
  strokeWidth?: number;
  type?: string | undefined;
  unit?: string | undefined;
  value: number | null;
}

export type ChartRow = {
  date: string;
  [variationName: string]: number | string | null;
};