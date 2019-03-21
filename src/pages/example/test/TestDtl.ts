import { Component, Vue } from 'vue-property-decorator'
import PageBody from 'cmp/pagebody/PageBody.vue'
import Project from 'model/test/Project'
import ProjectApi from 'http/test/ProjectApi'
import ConstantMgr from 'mgr/ConstantMgr'

@Component({
  name: 'TestDtl',
  components: {
    PageBody
  }
})
export default class TestDtl extends Vue {
  // 面包屑
  panelArray = [
    { name: '示例列表', url: 'testList' },
    { name: '示例详情' }
  ]
  // 详情
  project = new Project()
  // 表格数据
  tableData1: any = []
  // 分页
  page = {
    currentPage: 1,
    total: 0,
    size: 10
  }

  mounted() {
    this.getProjectDtl()
  }

  /**
   * 行内表格升级
   */
  onUpgrade() {
    this.$message.success('假装已经跳转了')
  }

  /**
   * 修改
   */
  onModify() {
    this.$router.push({ name: 'testAdd', query: { id: this.project.id as any } })
  }

  /**
   * 删除
   */
  onDelete() {
    this.$confirm('确定要删除该项目?', '删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      const loading = this.$loading(ConstantMgr.loadingOption)
      ProjectApi.delete(this.project.id!).then((resp: any) => {
        loading.close()
        this.$message.success('删除成功')
        this.$router.push('testList')
      }).catch((error) => {
        loading.close()
        this.$message.error(error.message)
      })
    })
  }

  /**
   * 获取详情
   */
  private getProjectDtl() {
    const loading = this.$loading(ConstantMgr.loadingOption)
    ProjectApi.get(this.$route.query.id).then((resp: any) => {
      if (resp.success) {
        loading.close()
        this.project = resp.data
        this.tableData1 = resp.data.lines
      }
    }).catch((e) => {
      loading.close()
      this.$message.error(e.message)
    })
  }
}