export const extractFirstRoutePart = (route: string): string | null => {
  const match = route.match(/^\/([^/]+)\/?/)
  return match != null ? match[1] : null
}
