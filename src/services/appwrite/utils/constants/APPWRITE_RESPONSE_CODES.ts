type AppwriteStatus = 'OK' | 'CREATED' | 'ACCEPTED' | 'NO_CONTENT'
type AppwriteCode = 200 | 201 | 202 | 204

export const APPWRITE_RESPONSE_CODES: Record<
AppwriteStatus,
{
  status: AppwriteStatus
  code: AppwriteCode
  message: string
}
> = {
  OK: {
    status: 'OK',
    code: 200,
    message: 'Success.'
  },
  CREATED: {
    status: 'CREATED',
    code: 201,
    message: 'The requested resource has been created successfully.'
  },
  ACCEPTED: {
    status: 'ACCEPTED',
    code: 202,
    message:
      'The requested change has been accepted for processing but has not been completed.'
  },
  NO_CONTENT: {
    status: 'NO_CONTENT',
    code: 204,
    message:
      'The server has successfully fulfilled the request and that there is no additional content.'
  }
}
