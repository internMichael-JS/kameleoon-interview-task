export const LINE_SELECTOR: Record<string, string> = {
  LINE: 'Line stile: line',
  SMOOTH: 'Line stile: smooth',
  AREA: 'Line stile: area',
} as const;

export const PERIOD_SELECTOR: Record<string, string> = {
  DAY: 'Day',
  WEEK: 'Week',
} as const;

export const VARIANT_SELECTOR: Record<string, string> = {
  ALL: 'All variations selected',
  VARIANT_A: 'Variant A',
  VARIANT_B: 'Variant B',
  VARIANT_C: 'Variant C',
} as const;

export const TEXT_CONSTANTS: Record<string, string> = {
  EXPORT_TEXT: 'You can save this as PNG image ->',
  EXPORT_TITLE: 'Export to PNG',
} as const;

export const VARIANT_COLORS: Record<string, string> = {
  Original: 'var(--line-color)',
  'Variation A': '#4142EF',
  'Variation B': '#FF8346',
  'Variation C': '#35BDAD',
};