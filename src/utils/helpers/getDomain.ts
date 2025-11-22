export const getDomain = (data: any[], variations: string | string[]) => {
  const keys = Array.isArray(variations) ? variations : [variations];

  const values: number[] = [];

  data.forEach(row => {
    keys.forEach(key => {
      const v = row[key];
      if (typeof v === "number" && !isNaN(v)) {
        values.push(v);
      }
    });
  });

  if (!values.length) return ["auto", "auto"];

  const min = Math.min(...values);
  const max = Math.max(...values);

  const padding = (max - min) * 0.1;

  return [
    Math.max(min - padding, 0),  
    max + padding
  ];
};
