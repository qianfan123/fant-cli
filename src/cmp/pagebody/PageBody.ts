import {Vue, Component, Prop} from 'vue-property-decorator'
import SubHeader from 'cmp/subheader/SubHeader.vue'
@Component({
    name: 'PageBody',
    components: {
        SubHeader
    }
})
export default class PageBody extends Vue {
    @Prop()
    title: string
    @Prop()
    panelArray: object[]
}
