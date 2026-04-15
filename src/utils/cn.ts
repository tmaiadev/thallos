export function cn(
  ...classNames: (string | null | object | boolean | number | undefined)[]
): string {
  return classNames
    .filter(className => !!className)
    .map(className => className?.toString())
    .join(" ");
}