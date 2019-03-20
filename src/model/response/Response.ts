export default class Response<T> {
  success: boolean
  fields: any
  message: string[] = []
  code: string
  data: T
  total: number
  more: boolean
}
