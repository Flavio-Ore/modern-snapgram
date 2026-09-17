import { isObjectEmpty } from '@/lib/utils'
import { type EmptyObject, type ObjectWithKeys } from '@/types'


export const parseModel = ({ model, errorMsg }: {
  model: ObjectWithKeys | EmptyObject | null | undefined
  errorMsg: string
}): never | void => {
  if (isObjectEmpty(model)) throw Error(errorMsg)
}
