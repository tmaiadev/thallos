export function formatGrowShrinkProp(value: number | boolean) : number {
  if (value === true) return 1;
  if (value === false) return 0;
  if (value < 0) return 0;
  return value;
}

export function formatFlexAlign(value: string): string {
  if (value === "start") return "flex-start";
  if (value === "end") return "flex-end";
  return value;
}