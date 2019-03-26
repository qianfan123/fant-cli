import { Component, Vue } from 'vue-property-decorator'
import PageWrapper from 'cmp/page/PageWrapper.vue'
import Project from 'model/test/Project'
import ConstantMgr from 'mgr/ConstantMgr'
import ProjectApi from 'http/test/ProjectApi'
import Response from 'model/response/Response'
import DtlWrapper from 'cmp/dtl/DtlWrapper.vue'

@Component({
  name: 'TestAdd',
  components: {
    PageWrapper,
    DtlWrapper
  }
})
export default class ProjectAdd extends Vue {
  // 面包屑
  panelArray = [
    { name: '示例列表', url: 'projectList' },
    { name: '示例新增' }
  ]
  project: Project = new Project()
  rules = [
    { required: true, message: '请输入项目名称', trigger: 'blur' }
  ]

  get isEditMode() {
    return !!this.$route.query.id
  }

  /**
   * 生命周期方法
   */
  created() {
    if (this.$route.query.id) { // 编辑
      this.panelArray[1].name = '编辑项目'
      this.project.id = this.$route.query.id as any
      this.getProjectDtl()
    }
  }

  /**
   * 返回
   */
  onBack() {
    this.$router.back()
  }

  /**
   * 提交
   */
  onSave() {
    (this.$refs as any).form.validate((valid: boolean) => {
      if (valid) {
        if (this.isEditMode) {
          const loading = this.$loading(ConstantMgr.loadingOption)
          ProjectApi.saveModify(this.project).then((resp: Response<void>) => {
            loading.close()
            this.$message.success('编辑成功')
            this.$router.push({ name: 'projectDtl', query: { id: this.$route.query.id } })
          }).catch((error: Error) => {
            loading.close()
            this.$message.error(error.message)
          })
        } else {
          const loading = this.$loading(ConstantMgr.loadingOption)
          ProjectApi.saveNew(this.project).then((resp: Response<string>) => {
            loading.close()
            this.$message.success('新增成功')
            this.$router.push({ name: 'projectDtl', query: { id: resp.data } })
          }).catch((error: Error) => {
            loading.close()
            this.$message.error(error.message)
          })
        }
      } else {
        return false
      }
    })
  }

  /**
   * 新增产品
   */
  onAddProduct() {
    this.$message.success('假装已经实现了')
  }

  /**
   * 删除
   */
  onDelete(scope: any) {
    this.project.lines.splice(scope.$index, 1)
    this.$message.success('删除成功')
  }

  /**
   * 获取项目详情
   */
  private getProjectDtl() {
    const loading = this.$loading(ConstantMgr.loadingOption)
    ProjectApi.get(this.project.id!).then((resp: Response<Project>) => {
      loading.close()
      this.project = resp.data
    }).catch((error: Error) => {
      loading.close()
      this.$message.error(error.message)
    })
  }
}