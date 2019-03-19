import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'QueryCondition'
})
export default class QueryCondition extends Vue {
  public opened = false

  public onSearch() {
    this.$emit('search', this.opened)
  }

  public onReset() {
    this.$emit('reset')
  }

  public onToggle() {
    this.opened = !this.opened
    this.$emit('toggle', this.opened)
  }

  public doToggle() {
    this.opened = false;
    this.$emit('toggle', this.opened)
  }
}
