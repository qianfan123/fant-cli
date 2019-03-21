import { Component, Vue } from 'vue-property-decorator'
import PageBody from 'cmp/pagebody/PageBody.vue'
import Project from 'model/test/Project'
import ConstantMgr from 'mgr/ConstantMgr'
import ProjectApi from 'http/test/ProjectApi'

@Component({
  name: 'TestAdd',
  components: {
    PageBody
  }
})
export default class TestAdd extends Vue {
  // 面包屑
  panelArray = [
    { name: '示例列表', url: 'testList' },
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
          ProjectApi.saveModify(this.project).then((resp) => {
            if (resp.success) {
              loading.close()
              this.$message.success('编辑成功')
              this.$router.push({ name: 'testDtl', query: { id: this.$route.query.id } })
            }
          }).catch((error) => {
            loading.close()
            this.$message.error(error.message)
          })
        } else {
          const loading = this.$loading(ConstantMgr.loadingOption)
          ProjectApi.saveNew(this.project).then((resp) => {
            if (resp.success) {
              loading.close()
              this.$message.success('新增成功')
              this.$router.push({ name: 'testDtl', query: { id: resp.data } })
            }
          }).catch((error) => {
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
    ProjectApi.get(this.$route.query.id).then((resp) => {
      if (resp.success) {
        loading.close()
        this.project = resp.data
      }
    }).catch((error) => {
      loading.close()
      this.$message.error(error.message)
    })
  }
}