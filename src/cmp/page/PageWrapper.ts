import {Vue, Component, Prop} from 'vue-property-decorator'
import SubHeader from 'cmp/subheader/SubHeader.vue'
@Component({
    name: 'PageWrapper',
    components: {
        SubHeader
    }
})
export default class PageWrapper extends Vue {
    @Prop()
    title: string
    @Prop()
    panelArray: object[]
    get getYear() {
        return new Date().getFullYear()
    }
}
