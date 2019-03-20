import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
    name: 'SubHeader',
    components: {}
})
export default class SubHeader extends Vue {
    @Prop()
    panelArray: any
    @Prop()
    proLogo: string
    bindPanel = ''
    created() {
        if (!this.panelArray) {
            return;
        }
        this.panelArray.forEach((item: any) => {
            if (item.url) {
                this.bindPanel += `<a :url="${item.url}" class="unSelected">${item.name}</a>&nbsp;/&nbsp;`
            } else {
                this.bindPanel += `<a class="selected">${item.name}</a>&nbsp;/&nbsp;`
            }

        });
        this.bindPanel = this.bindPanel.substring(0, this.bindPanel.lastIndexOf('/'));
    }
    onToView(event: any) {
        let arr = this.panelArray.filter((item: any) => {
            return item.name === event.target.text
        })
        arr[0] && this.$router.push({name: arr[0].url, query: arr[0].query})
    }
}
