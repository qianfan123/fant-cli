import { Component, Vue } from 'vue-property-decorator'
import PageBody from 'cmp/pagebody/PageBody.vue'
import QueryCondition from 'cmp/querycondition/QueryCondition.vue'
import ListContainer from 'cmp/listcontainer/ListContainer.vue'
import FormItem from 'cmp/formitem/FormItem.vue'
import ProjectApi from 'http/test/ProjectApi'
import QueryParam from 'model/request/QueryParam'
import FilterParam from 'model/request/FilterParam.ts'
import SortParam from 'model/request/SortParam'
import ProjectLine from 'model/test/ProjectLine'

@Component({
    name: 'TestList',
    components: {
        PageBody,
        QueryCondition,
        ListContainer,
        FormItem
    }
})
export default class TestList extends Vue {
    /******************************************************************************************************************
     *************************************************【变量定义start】**************************************************
     ******************************************************************************************************************/
    // 面包屑
    panelArray = [
        {
            name: '示例管理',
            url: ''
        },
    ];
    // 分页
    page = {
        currentPage: 1,
        total: 0,
        size: 10
    }
    // 排序
    sorts: SortParam[] = []
    // 表格数据
    tableData: ProjectLine[] = []
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
        console.log(`每页 ${val} 条`);
        this.page.size = val
        this.getProjectList()
    }

    /**
     * 分页页码改变的回调
     * @param val
     */
    onHandleCurrentChange(val: number) {
        console.log(`当前页: ${val}`);
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
     * 升级
     * @param row
     */
    doUpGrade(row: any) {
        console.dir(row)
        alert('升级')
    }

    /**
     * 删除
     * @param row
     */
    doDelete(row: any) {
        console.dir(row)
        alert('删除')
    }

    /**
     * 去详情
     * @param row
     */
    doGoDtl(row: any) {
        console.dir(row)
        this.$router.push('testDtl', row.id)
    }

    /**
     * 新建
     */
    doAdd() {
        this.$router.push('testAdd')
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
        ProjectApi.query(this.setParams()).then((resp: any) => {
            if (resp.success) {
                this.tableData = resp.data
                this.page.total = resp.total
            }
        }).catch((error: any) => {
            this.$message.error(error.message)
        })
    }
}