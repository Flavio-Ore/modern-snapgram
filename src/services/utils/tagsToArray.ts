export const tagsToArray = (tagsString: string) =>
  tagsString?.trim()?.replace(/ /g, '').split(',') ?? []
