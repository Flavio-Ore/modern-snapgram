export const enabledId = (id: string) => {
  if (id != null && id.trim().length === 0) return false
  if (id === '') return false
  return true
}
