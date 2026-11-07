export function getSearchParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}
