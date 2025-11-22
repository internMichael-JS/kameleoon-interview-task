export function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
}