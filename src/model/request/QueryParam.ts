import FilterParam from 'model/request/FilterParam'
import SortParam from 'model/request/SortParam'

export default class QueryParam {
  start: number = 0
  limit: number = 0
  filters: FilterParam[] = []
  sorters: SortParam[] = []
}
