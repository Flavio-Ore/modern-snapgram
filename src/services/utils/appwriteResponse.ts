interface AppwriteResponse<Data> {
  data: Data
  message: string
  status: string
  code: number
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
