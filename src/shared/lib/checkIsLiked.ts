export const checkIsLiked = (likeList: string[], userId: string): boolean =>
  likeList.includes(userId)
