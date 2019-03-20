import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'FormItem',
    components: {}
})
export default class FormItem extends Vue {
    @Prop()
    label: string
    @Prop({
        type: String,
        default: '96px'
    })
    labelWidth: string
    @Prop()
    labelAlign: string
    @Prop()
    labelPosition: string
    @Prop({
        type: Boolean,
        default: false
    })
    required: boolean

    get labelStyles() {
        return {
            width: this.labelWidth,
            textAlign: this.labelAlign
        }
    }
    get fieldStyles() {
        let ret = {
            marginLeft: ''
        }
        if (this.labelPosition === 'top') {
            return ret
        }
        ret.marginLeft = this.labelWidth
        return ret
    }
}