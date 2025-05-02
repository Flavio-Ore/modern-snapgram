import { getFileHash } from '@/services/utils/getFileHash'

export async function compareFilesByContent (file1: File, file2: File) {
  const file1Hash = await getFileHash(file1)
  const file2Hash = await getFileHash(file2)
  return file1Hash === file2Hash
}
