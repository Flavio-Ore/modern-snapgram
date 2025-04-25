import { AppwriteException } from 'appwrite'

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
