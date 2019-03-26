import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Main extends Vue {
  isCollapse: boolean = false

  onMenuClick() {
    this.$confirm('是否确认退出当前账户?', '退出登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      this.$router.push({ name: 'login' })
    })
  }

  /**
   * 侧边栏折叠
   */
  onCollapse() {
    this.isCollapse = !this.isCollapse
  }
}

