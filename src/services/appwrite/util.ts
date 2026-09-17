import { isObjectEmpty } from '@/lib/utils'
import { appwriteConfig, databases } from '@/services/appwrite/config'
import { type EmptyObject, type ObjectWithKeys, type Post } from '@/types'
import { AppwriteException, Query, type Models } from 'appwrite'

export async function findUserPosts ({ userId }: { userId?: string }) {
  if (userId == null || userId.trim().length === 0) return null
  try {
    const post = await databases.listDocuments<Post>(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.equal('creator', userId), Query.orderDesc('$createdAt')]
    )
    parseModel({ model: post, errorMsg: 'No posts found' })
    return post.documents
  } catch (error) {
    console.error(error)
    return null
  }
}

export class AppwriteError extends AppwriteException {
  constructor ({
    message,
    code,
    type,
    response
  }: {
    message: string
    code: number
    type: string
    response: string
    status: string
  }) {
    super(message, code, type, response)
  }
}

export const appwriteResponse = <Data>({
  data,
  message,
  status,
  code
}: AppwriteResponse<Data>): AppwriteResponse<Data> => ({
    data,
    message,
    status,
    code
  })
export interface AppwriteResponse<Data> {
  data: Data
  message: string
  status: string
  code: number
}

type AppwriteStatus = 'OK' | 'CREATED' | 'ACCEPTED' | 'NO_CONTENT'
type AppwriteCode = 200 | 201 | 202 | 204
export const APPWRITE_ERROR_TYPES = {
  storage_file_type_unsupported: 'storage_file_type_unsupported',
  user_not_found: 'user_not_found',
  user_invalid_credentials: 'user_invalid_credentials',
  storage_device_not_found: 'storage_device_not_found'
}

export const APPWRITE_RESPONSE_CODES: Record<
AppwriteStatus,
{
  text: AppwriteStatus
  code: AppwriteCode
  message: string
}
> = {
  OK: {
    text: 'OK',
    code: 200,
    message: 'Success.'
  },
  CREATED: {
    text: 'CREATED',
    code: 201,
    message: 'The requested resource has been created successfully.'
  },
  ACCEPTED: {
    text: 'ACCEPTED',
    code: 202,
    message:
      'The requested change has been accepted for processing but has not been completed.'
  },
  NO_CONTENT: {
    text: 'NO_CONTENT',
    code: 204,
    message:
      'The server has successfully fulfilled the request and that there is no additional content.'
  }
}

export const checkValidData = <T>(
  data: Models.Document | AppwriteException | null | undefined,
  dataProperty: T
) =>
    !(data instanceof AppwriteException) && data != null && dataProperty != null
      ? dataProperty
      : null

export const parseModel = ({
  model,
  errorMsg
}: {
  model: ObjectWithKeys | EmptyObject | null | undefined
  errorMsg: string
}): never | void => {
  if (isObjectEmpty(model)) throw Error(errorMsg)
}
