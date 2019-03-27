import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import User from 'model/example/User'
import UserApi from 'http/example/UserApi'

@Component({})
export default class UserSelect extends Vue {
  @Prop() value: any[]
  @Prop() disabled: boolean
  items: User[] = []
  item: User = new User()

  @Watch('value', { deep: true, immediate: true })
  watchValue(val: User) {
    if (val) {
      this.item = val
      this.items = [this.item]
    } else {
      this.item = new User()
    }
  }

  query(queryStr: string) {
    if (queryStr !== '') {
      UserApi.search(queryStr, 10).then((resp) => {
        this.items = resp.data
      }).catch((e) => {
        this.$message.error(e.message)
      })
    } else {
      this.items = []
    }
  }

  onChange() {
    this.$emit('input', this.item)
  }
}
