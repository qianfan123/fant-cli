import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import AuthApi from 'http/auth/AuthApi'
import User from 'model/user/User'

@Component({
    components: {}
})

export default class Login extends Vue {
    name: string = ''
    password: string = ''
    $refs: any
    @Action('user') actionUser: (user: User) => void
    ruleForm = {
        name: '',
        password: ''
    }
    rules = {
        name: [
            {
                required: true, message: '请输入用户名', trigger: 'blur'
            }
        ],
        password: [
            {
                required: true, message: '请输入登录密码', trigger: 'blur'
            }
        ]
    }

    onLogin(formName: any) {
        AuthApi.login(this.ruleForm.name, this.ruleForm.password).then((resp: any) => {
            if (resp && resp.success) {
                this.actionUser(resp.data.user)
                this.$router.push('testList')
            }
        }).catch((err: any) => {
            this.$message.error(err.message.toString())
        })
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
}