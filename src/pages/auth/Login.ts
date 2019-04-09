import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {}
})

export default class Login extends Vue {
  name: string = ''
  password: string = ''
  $refs: any
  ruleForm = {
    name: '',
    password: ''
  }
  rules = {
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
  }

  onLogin() {
    this.$router.push('projectList')
  }

  /**
   * 回车事件
   * @param event
   * @param type
   */
  onConfirm(event: any, type: string) {
    if (event.which === 13) {
      switch (type) {
        case 'name':
          this.$refs.password.focus()
          break
        case 'password':
          !this.$refs.login.disabled && this.$refs.login.$el.click()
          break
      }
    }
  }
  mounted() {
    console.log(this.$t('m.pages.login.title'))
  }
}