import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import QueryCondition from 'cmp/querycondition/QueryCondition.vue'
import ListWrapper from 'cmp/list/ListWrapper.vue'
import FormItem from 'cmp/formitem/FormItem.vue'
import ProjectApi from 'http/example/ProjectApi'
import QueryParam from 'model/request/QueryParam'
import FilterParam from 'model/request/FilterParam.ts'
import SortParam from 'model/request/SortParam'
import ConstantMgr from 'mgr/ConstantMgr'
import Project from 'model/example/Project'
import Response from 'model/response/Response'
@Component({
  name: 'ProjectList',
  components: {
    PageWrapper,
    QueryCondition,
    ListWrapper,
    FormItem
  }
})
export default class ProjectList extends Vue {
  /******************************************************************************************************************
   *************************************************【变量定义start】**************************************************
   ******************************************************************************************************************/
  // 面包屑
  panelArray = [
    {
      name: '示例管理',
      url: ''
    }
  ]
  // 分页
  page = {
    currentPage: 1,
    total: 0,
    size: 10
  }
  // 排序
  sorts: SortParam[] = []
  // 表格数据
  tableData: Project[] = []
  // 页面绑定数据
  model = {
    user: ''
  }
  /******************************************************************************************************************
   *************************************************【生命周期定义start】***********************************************
   ******************************************************************************************************************/
  mounted() {
    this.getProjectList()
  }

  /******************************************************************************************************************
   *************************************************【监听事件定义start】***********************************************
   ******************************************************************************************************************/
  /**
   * 每页多少条的回调
   * @param val
   */
  onHandleSizeChange(val: number) {
    console.log(`每页 ${val} 条`)
    this.page.size = val
    this.getProjectList()
  }

  /**
   * 分页页码改变的回调
   * @param val
   */
  onHandleCurrentChange(val: number) {
    console.log(`当前页: ${val}`)
    this.page.currentPage = val
    this.getProjectList()
  }

  /**
   * 表格排序条件
   */
  onSortChange({ column, prop, order }: any) {
    order === 'ascending' ? (order = 'ASC') : (order = 'DESC')
    let sorters = []
    let sortParam = new SortParam()
    sortParam.property = prop
    sortParam.direction = order
    column && prop && order && sorters.push(sortParam)
    this.sorts = sorters
    this.getProjectList()
  }

  /**
   * 查询
   */
  onSearch() {
    this.page.currentPage = 1
    this.getProjectList()
  }

  /**
   * 重置
   */
  onReset() {
    this.page.currentPage = 1
    this.model.user = ''
    this.getProjectList()
  }

  /**
   * 批量勾选回调
   * @param val
   */
  onHandleSelectionChange(val: any) {
    console.dir(val)
  }

  /*****************************************************************************************************************
   *************************************************【点击事件定义start】***********************************************
   ******************************************************************************************************************/
  /**
   * 编辑
   * @param row
   */
  doEdit(row: any) {
    console.dir(row)
    this.$router.push({ name: 'projectAdd', query: { id: row.id } })
  }

  /**
   * 去详情
   * @param row
   */
  doGoDtl(row: any) {
    console.dir(row)
    this.$router.push({ name: 'projectDtl', query: { id: row.id } })
  }

  /**
   * 新建
   */
  doAdd() {
    this.$router.push('projectAdd')
  }

  /**
   * 删除
   */
  doDelete() {
    this.getProjectList()
  }

  /******************************************************************************************************************
   *************************************************【局部方法定义start】***********************************************
   ******************************************************************************************************************/
  /**
   * 设置请求参数
   */
  private setParams() {
    let query = new QueryParam()
    query.filters.push(new FilterParam('name:%=%', ''))
    query.filters.push(new FilterParam('managerUuid:=', ''))
    query.sorters = this.getSorts()
    query.start = (this.page.currentPage - 1) * this.page.size
    query.limit = this.page.size
    return query
  }

  /**
   * 获取排序参数
   */
  private getSorts() {
    return this.sorts
  }

  /**
   * 获取列表数据
   */
  private getProjectList() {
    const loading = this.$loading(ConstantMgr.loadingOption)
    ProjectApi.query(this.setParams()).then((resp: Response<Project[]>) => {
      loading.close()
      this.tableData = resp.data
      this.page.total = resp.total
    }).catch((e: Error) => {
      loading.close()
      this.$message.error(e.message)
    })
  }
}