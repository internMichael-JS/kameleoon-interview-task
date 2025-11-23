export const getSelectFieldOptions = (options: Record<string, string>) =>
  Object.keys(options).map(key => ({
    label: options[key],
    value: key,
  }));
