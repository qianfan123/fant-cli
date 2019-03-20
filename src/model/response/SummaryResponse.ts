import Response from 'model/response/Response'

export default class SummaryResponse<T, S> extends Response<T> {
  summary: S | undefined
}
