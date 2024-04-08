import { isObjectEmpty } from '@/lib/utils'

interface ParseModel {
  model: Record<string, unknown>
  errorMsg: string
}
export const parseModel = ({ model, errorMsg }: ParseModel): void | never => {
  if (isObjectEmpty(model)) throw Error(errorMsg)
}
